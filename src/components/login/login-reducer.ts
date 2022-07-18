import { setAppStatus } from '../../app/app-reducer';
import { AppStatusType, LoginParamsType } from '../../api/TypesAPI';
import { authApi } from '../../api/API';
import axios from 'axios';
import { handleAppError, handleNetworkError } from '../../helpers/error-utils';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    name: '',
  },
  reducers: {
    login(state, action: PayloadAction<{ isLogin: boolean, name: string }>) {
      state.isLogin = action.payload.isLogin;
      state.name = action.payload.name;
    },
  },
});

export const { login } = slice.actions;
export const loginReducer = slice.reducer;

export const loginTC = (params: LoginParamsType) => (
  async(dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: AppStatusType.loading }));
    try {
      const res = await authApi.login(params);
      if (res.data.resultCode === 0) {
        dispatch(login({ isLogin: true, name: params.email }));
        dispatch(setAppStatus({ status: AppStatusType.succeeded }));
      } else {
        handleAppError(res.data, dispatch);
        dispatch(setAppStatus({ status: AppStatusType.failed }));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
        dispatch(setAppStatus({ status: AppStatusType.failed }));
      }
    }
  }
);

export const logoutTC = (isLogin: boolean) => (
  async(dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: AppStatusType.loading }));
    try {
      await authApi.logout();
      dispatch(login({ isLogin: isLogin, name: '' }));
      dispatch(setAppStatus({ status: AppStatusType.succeeded }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
        dispatch(setAppStatus({ status: AppStatusType.failed }));
      }
    }
  }
);