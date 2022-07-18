// import { Provider } from 'react-redux';
import React from 'react';
// import { v1 } from 'uuid';
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
// import { tasksReducer } from '../components/todolists/tasks/tasks-reducer';
// import { todoListReducer } from '../components/todolists/todoList-reducer';
// import { TaskTypePriority, TaskTypeStatus } from '../api/TypesAPI';
// import { appReducer } from '../app/app-reducer';
// import thunk from 'redux-thunk';
// import { loginReducer } from '../components/login/login-reducer';
//
// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todoLists: todoListReducer,
//   app: appReducer,
//   login: loginReducer,
// });
//
// const initialState = {
//   todolists: [
//     { id: 'todolistId1', title: 'What to learn', filter: 'all', status: 'idle' },
//     { id: 'todolistId2', title: 'What to buy', filter: 'all', status: 'idle' },
//   ],
//   tasks: {
//     ['todolistId1']: [
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
//         todoListId: 'todolistId1', startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false
//       },
//       {
//         id: v1(), title: 'JS', status: TaskTypeStatus.New,
//         todoListId: 'todolistId1', startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false
//       },
//     ],
//     ['todolistId2']: [
//       {
//         id: v1(), title: '111111', status: TaskTypeStatus.Completed,
//         todoListId: 'todolistId2', startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false
//       },
//       {
//         id: v1(), title: '222222222', status: TaskTypeStatus.New,
//         todoListId: 'todolistId2', startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false
//       },
//     ],
//   },
// };
//
// export const storyBookStore = createStore(rootReducer, initialState, applyMiddleware(thunk));
//
// export const ReduxStoreProviderDecorator = (story: any) => {
//   return <Provider store={storyBookStore}> {story()} </Provider>;
// };