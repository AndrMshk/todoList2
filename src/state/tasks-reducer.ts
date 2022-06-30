import { AddTodoListACType, RemoveTodoListACType, SetTodoListsACType } from './todoList-reducer';
import { TasksType, TaskTypeAPI, TaskTypePriority, TaskTypeStatus } from '../api/TypesAPI';
import { Dispatch } from 'redux';
import { todoListsApi } from '../api/API';
import { RootType } from './store';

type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodoListACType
  | RemoveTodoListACType
  | SetTodoListsACType

export type updateTaskModelType = {
  title?: string
  deadline?: string
  startDate?: string
  description?: string
  priority?: TaskTypePriority
  status?: TaskTypeStatus
}

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'DELETE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId),
      };
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      };
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId
          ? { ...el, ...action.taskModel }
          : el),
      };
    case 'ADD-TODOLIST':
      return { ...state, [action.todoList.id]: [] };
    case 'REMOVE-TODOLIST': {
      const copyState = { ...state };
      delete copyState[action.todoListId];
      return copyState;
    }
    case 'SET-TODOLISTS': {
      const copyState = { ...state };
      action.payload.forEach(el => {copyState[el.id] = [];});
      return copyState;
    }
    case 'SET-TASKS':
      return { ...state, [action.todoListId]: action.tasks };
    default:
      return state;
  }
};

export const removeTaskAC = (todoListId: string, taskId: string) => (
  { type: 'DELETE-TASK', todoListId, taskId } as const);
export const addTaskAC = (task: TaskTypeAPI) => ({ type: 'ADD-TASK', task } as const);
export const setTasksAC = (todoListId: string, tasks: any) => ({ type: 'SET-TASKS', todoListId, tasks } as const);
const updateTaskAC = (todoListId: string, taskId: string, taskModel: updateTaskModelType) => (
  { type: 'UPDATE-TASK', todoListId, taskId, taskModel } as const);

export const setTasksTC = (todoListId: string) => ((dispatch: Dispatch<ActionsType>) => {
  todoListsApi.getTasks(todoListId)
    .then(res => dispatch(setTasksAC(todoListId, res.data.items)));
});
export const removeTaskTC = (todoListId: string, taskId: string) => (
  (dispatch: Dispatch<ActionsType>) => {
  todoListsApi.deleteTask(todoListId, taskId)
    .then(() => dispatch(removeTaskAC(todoListId, taskId)));
});
export const addTaskTC = (todoListId: string, title: string) => (
  (dispatch: Dispatch<ActionsType>) => {
  todoListsApi.postTask(todoListId, { title })
    .then(res => dispatch(addTaskAC(res.data.data.item)));
});
export const updateTaskTC = (todoListId: string, taskId: string, taskModel: updateTaskModelType) => (
  ((dispatch: Dispatch<ActionsType>, getState: () => RootType) => {
    const task = getState().tasks[todoListId].find(el => el.id === taskId);
    if (task) {
      todoListsApi.updateTask(todoListId, taskId, { ...task, ...taskModel })
        .then(() => {
          dispatch(updateTaskAC(todoListId, taskId, taskModel));
        });
    }
  }));


