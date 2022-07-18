import { AppStatusType } from '../api/TypesAPI';
import { authApi } from '../api/API';
import { handleNetworkError } from '../helpers/error-utils';
import axios from 'axios';
import { login } from '../components/login/login-reducer';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  status: AppStatusType,
  error: string | null,
  isInitialized: boolean,
}

const slice = createSlice({
  name: 'app',
  initialState: {
    status: AppStatusType.idle,
    error: null,
    isInitialized: false,
  } as InitialStateType,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: AppStatusType }>) {
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appReducer = slice.reducer;
export const { setAppInitialized, setAppError, setAppStatus } = slice.actions;

export const setAppInitializedTC = () => (
  async(dispatch: Dispatch) => {
    try {
      const res = await authApi.authMe();
      if (res.data.resultCode === 0) {
        dispatch(login({ isLogin: true, name: res.data.data.email }));
      } else {
        dispatch(login({ isLogin: false, name: '' }));
      }
      dispatch(setAppInitialized({ isInitialized: true }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        handleNetworkError(err.message, dispatch);
      }
    }
  }
);

