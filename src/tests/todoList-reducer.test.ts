import { v1 } from 'uuid';
// import {
//   addTodoListAC,
//   removeTodoListAC,
//   setTodoListsAC,
//   todoListReducer, updateTodoListAC,
// } from '../components/todolists/todoList-reducer';
// import { AppStatusType, FilterValuesType, TodoListType } from '../api/TypesAPI';
//
//
// test('TODOLIST/REMOVE-TODOLIST', () => {
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//
//   const startState: TodoListType[] = [
//     { id: todolistID1, title: 'What to learn', filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle },
//     { id: todolistID2, title: 'What to buy', filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle },
//   ];
//   const endState = todoListReducer(startState, removeTodoListAC(todolistID1));
//
//   expect(endState.length).toBe(1);
//   expect(endState[0].id).toBe(todolistID2);
// });
// test('TODOLIST/ADD-TODOLIST', () => {
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//   let newTodoListTitle = 'New';
//
//   const startState: TodoListType[] = [
//     { id: todolistID1, title: 'What to learn', filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle },
//     { id: todolistID2, title: 'What to buy', filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle },
//   ];
//
//   const endState = todoListReducer(startState, addTodoListAC({ ...startState[0], title:  newTodoListTitle}));
//
//   expect(endState.length).toBe(3);
//   expect(endState[0].title).toBe(newTodoListTitle);
// });
// test('TODOLIST/CHANGE-FILTER', () => {
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//
//
//   const startState: TodoListType[] = [
//     { id: todolistID1, title: 'What to learn', filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle },
//     { id: todolistID2, title: 'What to buy', filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle },
//   ];
//
//   const endState = todoListReducer(startState, updateTodoListAC(todolistID1, { filter: FilterValuesType.active }));
//
//   expect(endState[0].filter).toBe(FilterValuesType.active);
// });
// test('TODOLIST/CHANGE-TODOLIST-TITLE', () => {
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//   let newTodoLIstTitle = 'NEW';
//
//   const startState: TodoListType[] = [
//     { id: todolistID1, title: 'What to learn', filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle },
//     { id: todolistID2, title: 'What to buy', filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle },
//   ];
//
//   const endState = todoListReducer(startState, updateTodoListAC(todolistID1, { title: newTodoLIstTitle }));
//   expect(endState[0].title).toBe(newTodoLIstTitle);
// });
// test('SET-TODOLISTS', () => {
//
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//   const startState: TodoListType[] = [];
//   const newState: TodoListType[] = [
//     { id: todolistID1, title: 'What to learn', filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle },
//     { id: todolistID2, title: 'What to buy', filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle },
//   ];
//
//   const endState = todoListReducer(startState, setTodoListsAC(newState));
//   expect(endState.length).toBe(2);
// });
//
