import { createSlice } from "@reduxjs/toolkit";

const getLocalTodo = () => {
  const localTodoList = JSON.parse(localStorage.getItem("todoList"));
  if (localTodoList) {
    return localTodoList;
  } else {
    return [];
  }
};

const initialState = {
  todoList: getLocalTodo(),
  filterByStatus: 'all',
  filterByTag: 'all'
};

const tasksSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask(state, action) {
        state.todoList.push(action.payload);
        let localTodoList = JSON.parse(localStorage.getItem('todoList'))
        if(localTodoList){
            localTodoList.push(action.payload)
            localStorage.setItem("todoList", JSON.stringify(localTodoList))
        }else{
            const newTodo = [action.payload]
            localStorage.setItem("todoList", JSON.stringify(newTodo))
        }
        return state
    },
    deleteTask(state, action){
        state.todoList = state.todoList.filter((item) => item.id !== action.payload.id)
        let localTodoList = JSON.parse(localStorage.getItem('todoList'))
        if(localTodoList){
            let newTodo = localTodoList.filter((task) => task.id !== action.payload.id)
            localStorage.setItem('todoList', JSON.stringify(newTodo))
        }
        return state
    },
   completeTask(state, action) {
    state.todoList = state.todoList.map((task) => task.id === action.payload.id ? {...task, isCompleted: !task.isCompleted} : task)
    let localTodoList = JSON.parse(localStorage.getItem('todoList'))
    if(localTodoList){
      let newTodo = localTodoList.map((task) => task.id === action.payload.id ? {...task, isCompleted: !task.isCompleted} : task)
      localStorage.setItem('todoList', JSON.stringify(newTodo))
    }
    return state
   },
   updateTask(state, action){
    let ind = state.todoList.findIndex((task) => task.id === action.payload.id)
    state.todoList[ind] = action.payload 
    let localTodo = JSON.parse(localStorage.getItem('todoList'))
    if(localTodo){
      localTodo[ind] = action.payload
      localStorage.setItem('todoList', JSON.stringify(localTodo))
    }
   },
   updateFilterByStatus(state, action){
      state.filterByStatus = action.payload
   },
   updateFilterByTag(state, action){
     state.filterByTag = action.payload
   }
  },
});


export const {addTask, deleteTask, completeTask, updateFilterByStatus,updateFilterByTag, updateTask} = tasksSlice.actions
export default tasksSlice.reducer
