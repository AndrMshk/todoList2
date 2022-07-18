import { AppStatusType, FilterValuesType, TodoListType } from '../../api/TypesAPI';
import { todoListsApi } from '../../api/API';
import { setAppStatus } from '../../app/app-reducer';
import { handleAppError, handleNetworkError } from '../../helpers/error-utils';
import axios from 'axios';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

export type UpdateTodoListModelType = {
  title?: string
  order?: number
  filter?: FilterValuesType
  status?: AppStatusType
}

const slice = createSlice({
  name: 'todoList',
  initialState: [] as TodoListType[],
  reducers: {
    removeTodoList(state, action: PayloadAction<{ todoListId: string }>) {
      const index = state.findIndex(({ id }) => id === action.payload.todoListId);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    addTodoList(state, action: PayloadAction<{ todoList: TodoListType }>) {
      state.unshift({ ...action.payload.todoList, filter: FilterValuesType.all, status: AppStatusType.idle });
    },
    setTodoLists(state, action: PayloadAction<{ todoLists: TodoListType[] }>) {
      return action.payload.todoLists.map(el => (
        { ...el, filter: FilterValuesType.all, status: AppStatusType.idle }));
    },
    updateTodoList(state, action: PayloadAction<{ todoListId: string, todoListModel: UpdateTodoListModelType }>) {
      const index = state.findIndex(({ id }) => id === action.payload.todoListId);
      state[index] = { ...state[index], ...action.payload.todoListModel };
    },
  },
});

export const todoListReducer = slice.reducer;
export const { removeTodoList, addTodoList, setTodoLists, updateTodoList } = slice.actions;

export const setTodoListsTC = () => (
  async(dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: AppStatusType.loading }));
    try {
      const res = await todoListsApi.getTodolists();
      dispatch(setTodoLists({ todoLists: res.data }));
      dispatch(setAppStatus({ status: AppStatusType.succeeded }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  });
export const addTodoListTC = (title: string) => (
  async(dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: AppStatusType.loading }));
    try {
      const res = await todoListsApi.postTodoList({ title });
      if (res.data.resultCode === 0) {
        dispatch(addTodoList({ todoList: res.data.data.item }));
        dispatch(setAppStatus({ status: AppStatusType.succeeded }));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  });
export const removeTodoListTC = (todoListId: string) => (
  async(dispatch: Dispatch) => {
    dispatch(updateTodoList({ todoListId, todoListModel: { status: AppStatusType.loading } }));
    dispatch(setAppStatus({ status: AppStatusType.loading }));
    try {
      const res = await todoListsApi.deleteTodoList(todoListId);
      if (res.data.resultCode === 0) {
        dispatch(removeTodoList({ todoListId }));
        dispatch(setAppStatus({ status: AppStatusType.succeeded }));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
    dispatch(updateTodoList({ todoListId, todoListModel: { status: AppStatusType.succeeded } }));
  });
export const updateTodoListTC = (todoListId: string, title: string) => (
  async(dispatch: Dispatch) => {
    dispatch(updateTodoList({ todoListId, todoListModel: { status: AppStatusType.loading } }));
    dispatch(setAppStatus({ status: AppStatusType.loading }));
    try {
      const res = await todoListsApi.updateTodoList(todoListId, { title });
      if (res.data.resultCode === 0) {
        dispatch(updateTodoList({ todoListId, todoListModel: { title } }));
        dispatch(setAppStatus({ status: AppStatusType.succeeded }));
        dispatch(updateTodoList({ todoListId, todoListModel: { status: AppStatusType.succeeded } }));
      } else {
        handleAppError(res.data, dispatch);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
    dispatch(updateTodoList({ todoListId, todoListModel: { status: AppStatusType.succeeded } }));
  }
);




