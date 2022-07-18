import { AppStatusType, TasksType, TaskTypeAPI, TaskTypePriority, TaskTypeStatus } from '../../../api/TypesAPI';
import { todoListsApi } from '../../../api/API';
import { RootStateType } from '../../../app/store';
import { setAppStatus } from '../../../app/app-reducer';
import { handleAppError, handleNetworkError } from '../../../helpers/error-utils';
import axios from 'axios';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { addTodoList, removeTodoList, setTodoLists } from '../todoList-reducer';

export type UpdateTaskModelType = {
  title?: string
  deadline?: string
  startDate?: string
  description?: string
  priority?: TaskTypePriority
  status?: TaskTypeStatus
  isDisabled?: boolean
}

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: {
    removeTask(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex(el => el.id === action.payload.taskId);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    },
    addTask(state, action: PayloadAction<{ task: TaskTypeAPI }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    setTasks(state, action: PayloadAction<{ todoListId: string, tasks: TaskTypeAPI[] }>) {
      state[action.payload.todoListId] = action.payload.tasks;
    },
    updateTask(state, action: PayloadAction<{ todoListId: string, taskId: string, taskModel: UpdateTaskModelType }>) {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex(el => el.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.taskModel };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodoList, (state, action) => {
      state[action.payload.todoList.id] = [];
    });
    builder.addCase(removeTodoList, (state, action) => {
      delete state[action.payload.todoListId];
    });
    builder.addCase(setTodoLists, (state, action) => {
      action.payload.todoLists.forEach(el => state[el.id] = []);
    });
  },
});

export const tasksReducer = slice.reducer;
export const { removeTask, addTask, setTasks, updateTask } = slice.actions;

export const setTasksTC = (todoListId: string) => (
  async(dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: AppStatusType.loading }));
    try {
      const res = await todoListsApi.getTasks(todoListId);
      dispatch(setTasks({ todoListId, tasks: res.data.items }));
      dispatch(setAppStatus({ status: AppStatusType.succeeded }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  }
);
export const removeTaskTC = (todoListId: string, taskId: string) => (
  async(dispatch: Dispatch) => {
    dispatch(updateTask({ todoListId, taskId, taskModel: { isDisabled: true } }));
    dispatch(setAppStatus({ status: AppStatusType.loading }));
    try {
      const res = await todoListsApi.deleteTask(todoListId, taskId);
      if (res.data.resultCode === 0) {
        dispatch(removeTask({ todoListId, taskId }));
        dispatch(setAppStatus({ status: AppStatusType.succeeded }));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err?.message, dispatch);
      }
    }
    dispatch(updateTask({ todoListId, taskId, taskModel: { isDisabled: false } }));
  }
);
export const addTaskTC = (todoListId: string, title: string) => (
  async(dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: AppStatusType.loading }));
    try {
      const res = await todoListsApi.postTask(todoListId, { title });
      if (res.data.resultCode === 0) {
        dispatch(addTask({ task: res.data.data.item }));
        dispatch(setAppStatus({ status: AppStatusType.succeeded }));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  }
);
export const updateTaskTC = (todoListId: string, taskId: string, taskModel: UpdateTaskModelType) => (
  (async(dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(updateTask({ todoListId, taskId, taskModel: { isDisabled: true } }));
    dispatch(setAppStatus({ status: AppStatusType.loading }));
    const task = getState().tasks[todoListId].find(el => el.id === taskId);
    if (task) {
      try {
        const res = await todoListsApi.updateTask(todoListId, taskId, { ...task, ...taskModel });
        if (res.data.resultCode === 0) {
          dispatch(updateTask({ todoListId, taskId, taskModel }));
          dispatch(setAppStatus({ status: AppStatusType.succeeded }));
        } else {
          handleAppError(res.data, dispatch);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          handleNetworkError(err.message, dispatch);
        }
      }
    }
    dispatch(updateTask({ todoListId, taskId, taskModel: { isDisabled: false } }));
  })
);



