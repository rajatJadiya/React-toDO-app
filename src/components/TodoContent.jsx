import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoContent = () => {

    const todo = useSelector((store) => store.todo.todoList)
    const filterStatus = useSelector((store) => store.todo.filterByStatus)
    const filterTag = useSelector((store) => store.todo.filterByTag)

    const sortedTodo = [...todo]
    sortedTodo.sort((a, b) => new Date(a.time) - new Date(b.time))

    const filteredTodo = sortedTodo.filter((task) =>{

        // status is all
        if(filterStatus === 'all' && filterTag === 'all'){
          return true
        }
        else if(filterStatus === 'all' && filterTag === 'work'){
          return task.tags.find((tag) => tag.value === filterTag)
        }
        else if(filterStatus === 'all' && filterTag === 'personal'){
          return task.tags.find((tag) => tag.value === filterTag)
        }
        else if(filterStatus === 'all' && filterTag === 'important'){
          return task.tags.find((tag) => tag.value === filterTag)
        }

        // status is completed
        else if(filterStatus === 'completed' && filterTag === 'all'){
          return task.isCompleted
        }
        else if(filterStatus === 'completed' && filterTag === 'work'){
          return task.isCompleted && task.tags.find((tag) => tag.value === filterTag)
        }
        else if(filterStatus === 'completed' && filterTag === 'personal'){
          return task.isCompleted && task.tags.find((tag) => tag.value === filterTag)
        }
        else if(filterStatus === 'completed' && filterTag === 'important'){
          return task.isCompleted && task.tags.find((tag) => tag.value === filterTag)
        }

        // status is incomplete
        else if(filterStatus === 'incomplete' && filterTag === 'all'){
          return task.isCompleted === false
        }
        else if(filterStatus === 'incomplete' && filterTag === 'work'){
          return task.isCompleted === false && task.tags.find((tag) => tag.value === filterTag)
        }
        else if(filterStatus === 'incomplete' && filterTag === 'personal'){
          return task.isCompleted === false && task.tags.find((tag) => tag.value === filterTag)
        }
        else if(filterStatus === 'incomplete' && filterTag === 'important'){
          return task.isCompleted === false && task.tags.find((tag) => tag.value === filterTag)
        }
        
    })

  if(todo.length == 0 ){
    return <div className="rounded-lg p-4 mt-8 bg-gray-200">
      <p className="text-center text-xl">No tasks found. Use the create task button to add a task</p>
    </div>
  }

  if(filteredTodo.length == 0){
    return <div className="rounded-lg p-4 mt-8 bg-gray-200">
      <p className="text-center text-xl">No filtered tasks found.</p>
    </div>
  }

  return (
  
    <div className="rounded-lg p-4 mt-8 bg-teal-100">
        {filteredTodo.filter(task => task.isPriority === true && task.isCompleted === false).map(task => {
            return <TodoItem key={task.id} task={task} />
        })}
        {filteredTodo.filter(task => task.isPriority === false && task.isCompleted === false).map(task => {
          return <TodoItem key={task.id} task={task} />
        })}
        {filteredTodo.find((task) => task.isCompleted === true) && <h4 className="text-2xl font-bold text-teal-800 mb-3">Completed Tasks</h4>}
        {filteredTodo.filter(task => task.isCompleted === true).map(task => {
          return <TodoItem key={task.id} task={task} />
        })}

    </div>
  
  );
};

export default TodoContent;
