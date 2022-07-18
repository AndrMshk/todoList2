import { AnyAction, combineReducers } from 'redux';
import { todoListReducer } from '../components/todolists/todoList-reducer';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from './app-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from '../components/login/login-reducer';
import { tasksReducer } from '../components/todolists/tasks/tasks-reducer';

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,
  },
);

export type DispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export type RootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});
