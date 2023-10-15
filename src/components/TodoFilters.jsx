import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilterByStatus, updateFilterByTag } from '../reducers/tasksSlice'

const TodoFilters = () => {

    const filterStatus = useSelector((store) => store.todo.filterByStatus)
    const filterTag = useSelector((store) => store.todo.filterByTag)
    const dispatch = useDispatch()
    
    // console.log(filterStatus)
    const updateStatus = (e) =>{
        dispatch(updateFilterByStatus(e.target.value))
    }
    // console.log(filterTag)
    const updateTag = (e) =>{
        dispatch(updateFilterByTag(e.target.value))
    }

  return (
    <div className='flex flex-col sm:flex-row sm:items-center mt-12 sm:justify-between'>
        <h3 className='text-2xl font-mono'>Filters</h3>
        <div className='flex sm:flex-row gap-5 mt-5 sm:mt-0'>
        <div>
            <p className='text-lg mb-2 sm:mb-0 font-mono'>By Tags</p>
            <select value={filterTag} onChange={updateTag} className='border-gray-500 border-2 rounded-lg p-2 max-w-[150px]'>
                <option value="all">All</option>
                <option value="important">Important</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
            </select>
        </div>
        <div>
            <p className='text-lg mb-2 sm:mb-0 font-mono'>By Status</p>
            <select value={filterStatus} onChange={updateStatus} className='border-gray-500 border-2 rounded-lg p-2 max-w-[150px]'>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
            </select>
        </div>
        </div>
    </div>
  )
}

export default TodoFilters