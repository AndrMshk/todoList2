import { AppStatusType, ResponseType } from '../api/TypesAPI';
import { setAppError, setAppStatus } from '../app/app-reducer';
import { Dispatch } from '@reduxjs/toolkit';

export const handleAppError = <Data>(
  data: ResponseType<Data>,
  dispatch: Dispatch) => {
  data.messages.length
    ? dispatch(setAppError({ error: data.messages[0] }))
    : dispatch(setAppError({ error: 'SOME ERROR' }));
  dispatch(setAppStatus({ status: AppStatusType.failed }));
};

export const handleNetworkError = (
  message: string,
  dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: AppStatusType.failed }));
  dispatch(setAppError({ error: message ? message : 'SOME ERROR' }));
};