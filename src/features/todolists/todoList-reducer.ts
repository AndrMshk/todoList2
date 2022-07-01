import { FilterValuesType, TodoListType } from '../../api/TypesAPI';
import { Dispatch } from 'redux';
import { todoListsApi } from '../../api/API';
import { AppStatusType, setAppStatusAC, SetErrorACType, SetStatusACType } from '../../app/app-reducer';
import { handleAppError, handleNetworkError } from '../../helpers/error-utils';

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export type SetTodoListsACType = ReturnType<typeof setTodoListsAC>

type ActionsType =
  | RemoveTodoListACType
  | AddTodoListACType
  | SetTodoListsACType
  | ReturnType<typeof updateTodoListAC>

export type updateTodoListModelType = {
  title?: string
  order?: number
  filter?: FilterValuesType
  status?: AppStatusType
}

const initialState: TodoListType[] = [];

export const todoListReducer = (state: TodoListType[] = initialState, action: ActionsType): TodoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(({ id }) => id !== action.todoListId);
    case 'ADD-TODOLIST':
      return [{ ...action.todoList, filter: FilterValuesType.all, status: AppStatusType.idle }, ...state];
    case 'UPDATE-TODOLIST':
      return state.map(el => el.id === action.todoListId
        ? { ...el, ...action.todoListModel }
        : el);
    case 'SET-TODOLISTS':
      return action.payload.map(el => ({ ...el, filter: FilterValuesType.all, status: AppStatusType.idle }));
    default:
      return state;
  }
};

export const removeTodoListAC = (todoListId: string) => (
  { type: 'REMOVE-TODOLIST', todoListId } as const);
export const addTodoListAC = (todoList: TodoListType) => (
  { type: 'ADD-TODOLIST', todoList } as const);
export const setTodoListsAC = (todoLists: TodoListType[]) => ({
  type: 'SET-TODOLISTS',
  payload: todoLists,
} as const);
export const updateTodoListAC = (todoListId: string, todoListModel: updateTodoListModelType) => (
  { type: 'UPDATE-TODOLIST', todoListId, todoListModel } as const
);

export const setTodoListsTC = () => (
  (dispatch: Dispatch<ActionsType | SetStatusACType | SetErrorACType>) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    todoListsApi.getTodolists()
      .then(res => {
        dispatch(setTodoListsAC(res.data));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      })
      .catch(err => handleNetworkError(err, dispatch));
  });
export const addTodoListTC = (title: string) => (
  (dispatch: Dispatch<ActionsType | SetStatusACType | SetErrorACType>) => {
    dispatch(setAppStatusAC(AppStatusType.loading));
    todoListsApi.postTodoList({ title })
      .then(res => {
        dispatch(addTodoListAC(res.data.data.item));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      })
      .catch(err => handleNetworkError(err, dispatch));
  });
export const removeTodoListTC = (todoListId: string) => (
  (dispatch: Dispatch<ActionsType | SetStatusACType | SetErrorACType>) => {
    dispatch(updateTodoListAC(todoListId, { status: AppStatusType.loading }));
    dispatch(setAppStatusAC(AppStatusType.loading));
    todoListsApi.deleteTodoList(todoListId)
      .then(() => {
        dispatch(removeTodoListAC(todoListId));
        dispatch(setAppStatusAC(AppStatusType.succeeded));
      })
      .catch(err => handleNetworkError(err, dispatch));
  });
export const changeTitleTodoListTC = (todoListId: string, title: string) => (
  (dispatch: Dispatch<ActionsType | SetStatusACType | SetErrorACType>) => {
    dispatch(updateTodoListAC(todoListId, { status: AppStatusType.loading }));
    dispatch(setAppStatusAC(AppStatusType.loading));
    todoListsApi.updateTodoList(todoListId, { title })
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTodoListAC(todoListId, { title }));
          dispatch(setAppStatusAC(AppStatusType.succeeded));
          dispatch(updateTodoListAC(todoListId, { status: AppStatusType.succeeded }));
        } else {
          handleAppError(res.data, dispatch);
        }
      })
      .catch(err => handleNetworkError(err, dispatch));
  }
);



