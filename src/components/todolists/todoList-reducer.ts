import { AppStatusType, FilterValuesType, TodoListType } from '../../api/TypesAPI';
import { todoListsApi } from '../../api/API';
import { setAppStatusAC } from '../../app/app-reducer';
import { handleAppError, handleNetworkError } from '../../helpers/error-utils';
import { ThunkTypes } from '../../app/store';
import axios from 'axios';

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export type SetTodoListsACType = ReturnType<typeof setTodoListsAC>

export type TodoListsActionsType =
  | RemoveTodoListACType
  | AddTodoListACType
  | SetTodoListsACType
  | ReturnType<typeof updateTodoListAC>

export type UpdateTodoListModelType = {
  title?: string
  order?: number
  filter?: FilterValuesType
  status?: AppStatusType
}

const initialState: TodoListType[] = [];

export const todoListReducer = (state: TodoListType[] = initialState, action: TodoListsActionsType): TodoListType[] => {
  switch (action.type) {
    case 'TODOLIST/REMOVE-TODOLIST':
      return state.filter(({ id }) => id !== action.todoListId);
    case 'TODOLIST/ADD-TODOLIST':
      return [{ ...action.todoList, filter: FilterValuesType.all, status: AppStatusType.idle }, ...state];
    case 'TODOLIST/UPDATE-TODOLIST':
      return state.map(el => el.id === action.todoListId
        ? { ...el, ...action.todoListModel }
        : el);
    case 'TODOLIST/SET-TODOLISTS':
      return action.payload.map(el => ({ ...el, filter: FilterValuesType.all, status: AppStatusType.idle }));
    default:
      return state;
  }
};

export const removeTodoListAC = (todoListId: string) => (
  { type: 'TODOLIST/REMOVE-TODOLIST', todoListId } as const);
export const addTodoListAC = (todoList: TodoListType) => (
  { type: 'TODOLIST/ADD-TODOLIST', todoList } as const);
export const setTodoListsAC = (todoLists: TodoListType[]) => ({
  type: 'TODOLIST/SET-TODOLISTS',
  payload: todoLists,
} as const);
export const updateTodoListAC = (todoListId: string, todoListModel: UpdateTodoListModelType) => (
  { type: 'TODOLIST/UPDATE-TODOLIST', todoListId, todoListModel } as const
);

export const setTodoListsTC = (): ThunkTypes => (
  async(dispatch) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await todoListsApi.getTodolists();
      dispatch(setTodoListsAC(res.data));
      dispatch(setAppStatusAC(AppStatusType.succeeded));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  });
export const addTodoListTC = (title: string): ThunkTypes => (
  async(dispatch) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await todoListsApi.postTodoList({ title });
      if (res.data.resultCode === 0) {
        dispatch(addTodoListAC(res.data.data.item));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  });
export const removeTodoListTC = (todoListId: string): ThunkTypes => (
  async(dispatch) => {
    dispatch(updateTodoListAC(todoListId, { status: AppStatusType.loading }));
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await todoListsApi.deleteTodoList(todoListId);
      if (res.data.resultCode === 0) {
        dispatch(removeTodoListAC(todoListId));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
    dispatch(updateTodoListAC(todoListId, { status: AppStatusType.succeeded }));
  });
export const updateTodoListTC = (todoListId: string, title: string): ThunkTypes => (
  async(dispatch) => {
    dispatch(updateTodoListAC(todoListId, { status: AppStatusType.loading }));
    dispatch(setAppStatusAC(AppStatusType.loading));
    try {
      const res = await todoListsApi.updateTodoList(todoListId, { title });
      if (res.data.resultCode === 0) {
        dispatch(updateTodoListAC(todoListId, { title }));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
        dispatch(updateTodoListAC(todoListId, { status: AppStatusType.succeeded }));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
    dispatch(updateTodoListAC(todoListId, { status: AppStatusType.succeeded }));
  }
);




