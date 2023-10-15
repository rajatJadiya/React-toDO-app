import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { BsTrashFill, BsFillExclamationDiamondFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppContext } from "../App";
import { completeTask, deleteTask } from "../reducers/tasksSlice";
import CheckBtn from "./CheckBtn";

const TodoItem = ({ task }) => {
  const dispatch = useDispatch();
  const { setTaskId, taskId, setIsOpen2 } = useContext(AppContext);

  const handleDelete = () => {
    dispatch(deleteTask(task));
    toast.success("Todo task has been deleted successfully!");
  };

  const handleComplete = () => {
    if (task.isCompleted) {
      dispatch(completeTask(task));
      toast.success("Task undo successfully!");
    } else {
      dispatch(completeTask(task));
      toast.success("Congratulations on completing the task! 🎉");
    }
  };

  const handleEdit = (taskId) => {
    setTaskId(taskId);
    setIsOpen2(true);
  };
  // console.log(taskId)

  return (
    <div className="bg-white mb-5 px-4 py-3 rounded-lg flex flex-col sm:flex-row sm:items-center gap-3">
      <div role={"button"} className="cursor-pointer" onClick={handleComplete}>
        <CheckBtn complete={task.isCompleted} />
      </div>
      <div className="flex-grow">
        <p className="text-2xl font-bold font-mono break-all">{task.taskName}</p>
        <p className="text-md text-gray-600 font-semibold break-all">
          {task.description}
        </p>
        <p className="text-sm text-gray-500 leading-none">
          created at {task.time}
        </p>
        <div className="space-x-1 sm:space-x-3 mt-2">
          {task.tags.map((tag) => {
            return (
              <span
                key={tag.value}
                className="bg-purple-500 text-white p-1 rounded-sm"
              >
                {tag.label}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-4 sm:gap-2">
        <abbr title="Priority Task">
          {task.isPriority && (
            <BsFillExclamationDiamondFill
              size={20}
              className="text-yellow-600"
            />
          )}
        </abbr>
        <button
          onClick={handleDelete}
          className="sm:bg-white bg-gray-200 hover:bg-white"
        >
          <BsTrashFill
            className="text-red-600 hover:scale-105 "
            size={25}
          />
        </button>

        {/* Edit button has been added */}
        <button
          disabled={task.isCompleted}
          onClick={() => handleEdit(task.id)}
          className="bg-white hover:bg-white"
        >
          <FaEdit size={25} className="text-gray-900 hover:scale-105" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
