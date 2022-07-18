import { v1 } from 'uuid';
// import {
//   addTaskAC,
//   removeTaskAC,
//   setTasksAC,
//   tasksReducer,
//   updateTaskAC,
// } from '../components/todolists/tasks/tasks-reducer';
// import {
//   AppStatusType,
//   FilterValuesType,
//   TasksType,
//   TaskTypePriority,
//   TaskTypeStatus,
//   TodoListType,
// } from '../api/TypesAPI';
// import { setTodoListsAC } from '../components/todolists/todoList-reducer';
//
// test('DELETE-TASK', () => {
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//
//   const startState: TasksType = {
//     [todolistID1]: [
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       }, {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//     ],
//     [todolistID2]: [
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//     ],
//   };
//   const endState = tasksReducer(startState, removeTaskAC(todolistID1, startState[todolistID1][0].id));
//
//   expect(endState[todolistID1].length).toBe(startState[todolistID1].length - 1);
//   expect(endState[todolistID2].length).toBe(startState[todolistID2].length);
//   expect(endState[todolistID1].every(t => t.id !== startState[todolistID1][0].id)).toBeTruthy();
// });
// test('CHANGE-TASK-CHECKBOX', () => {
//
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//
//   const startState: TasksType = {
//     [todolistID1]: [
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       }, {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//     ],
//     [todolistID2]: [
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//     ],
//   };
//
//   const endState = tasksReducer(startState, updateTaskAC(todolistID2,
//     startState[todolistID2][0].id, { status: TaskTypeStatus.New }));
//   expect(endState[todolistID2][0].status).toBe(TaskTypeStatus.New);
// });
// test('ADD-TASK', () => {
//
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//
//   let newTaskTitle = 'new';
//
//   const startState: TasksType = {
//     [todolistID1]: [
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       }, {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//     ],
//     [todolistID2]: [
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//     ],
//   };
//
//   const endState = tasksReducer(startState, addTaskAC({ ...startState[todolistID1][0], title: newTaskTitle }));
//   expect(endState[todolistID1].length).toBe(startState[todolistID1].length + 1);
//   expect(endState[todolistID1][0].title).toBe(newTaskTitle);
// });
// test('CHANGE-TASK-TITLE', () => {
//
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//
//   let newTaskTitle = 'new';
//
//   const startState: TasksType = {
//     [todolistID1]: [
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       }, {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//     ],
//     [todolistID2]: [
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID2, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//     ],
//   };
//
//   const endState = tasksReducer(startState,
//     updateTaskAC(todolistID1, startState[todolistID1][1].id, { title: newTaskTitle }));
//
//   expect(endState[todolistID1].length).toBe(startState[todolistID1].length);
//   expect(endState[todolistID1][1].title).toBe(newTaskTitle);
//
// });
// test('SET-TODOLISTS', () => {
//   let todolistID1 = v1();
//   let todolistID2 = v1();
//   const todoLists: TodoListType[] = [
//     {
//       id: todolistID1, title: 'What to learn',
//       filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle,
//     },
//     {
//       id: todolistID2, title: 'What to buy',
//       filter: FilterValuesType.all, addedDate: '', order: 0, status: AppStatusType.idle,
//     },
//   ];
//
//   const endState = tasksReducer({}, setTodoListsAC(todoLists));
//
//   expect(endState[todolistID1]).toBeDefined();
//   expect(endState[todolistID2]).toStrictEqual([]);
// });
// test('SET-TASKS', () => {
//
//   let todolistID1 = v1();
//
//   const startState: TasksType = {
//     [todolistID1]: [
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.Completed,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//       {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       }, {
//         id: v1(), title: 'HTML&CSS', status: TaskTypeStatus.New,
//         todoListId: todolistID1, startDate: '', priority: TaskTypePriority.Low,
//         description: '', deadline: '', addedDate: '', order: 0, isDisabled: false,
//       },
//     ],
//   };
//
//   const action = setTasksAC(todolistID1, startState[todolistID1]);
//
//   const endState = tasksReducer({ todolistID1: [] }, action);
//
//   expect(endState[todolistID1].length).toBe(3);
// });
//
//
//
//
