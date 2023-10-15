import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../App";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../reducers/tasksSlice";
import { toast } from "react-hot-toast";


const EditModal = () => {
  const todo = useSelector((store) => store.todo.todoList);
  const { isOpen2, setIsOpen2, taskId } = useContext(AppContext);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const options = [
    { value: "work", label: "WorK" },
    { value: "personal", label: "Personal" },
    { value: "important", label: "Important" },
  ];

  useEffect(() => {
    let item = todo.find((task) => task.id === taskId);
    // console.log(item);
    setFormData({...item});
  }, [taskId]);

  const selectStyles = {
    control: (styles, state) => {
      return {
        ...styles,
        display: "inline-flex",
        border: state.isFocused ? "2px solid #99f6e4" : "2px solid #0f766e",
      };
    },
  };

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(formData.taskName){
        dispatch(updateTask(formData))
        setIsOpen2(false)
        toast.success("Task edited successfully!")
    }else{
        toast.error("task field cannot be empty!")
    }
  }

  if (!isOpen2) return null;
  return (
    <>
      <div className="fixed bg-black/40 inset-0"></div>
      <div className=" bg-white fixed top-4 left-4 right-4 bottom-4 lg:right-auto lg:bottom-auto lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold mr-12 text-teal-700">Edit Task</h2>
          <button
            onClick={() => setIsOpen2(false)}
            className="hover:bg-red-500 bg-gray-300"
          >
            <MdOutlineClose className="text-black" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-8">
            <input
              name={"taskName"}
              value={formData.taskName}
              onChange={(e) =>
                setFormData({ ...formData, taskName: e.target.value })
              }
              type="text"
              placeholder="Enter task..."
              className="border-2 border-teal-600 rounded-md p-3 focus:outline-4 focus:outline-teal-200 font-mono text-2xl w-full"
            />
          </div>
          <div className="my-8">
            <textarea
              name={"description"}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter description"
              className="border-2 border-teal-600 rounded-md p-3 focus:outline-4 focus:outline-teal-200 font-mono text-2xl resize-none w-full"
              rows={5}
              cols={40}
            />
          </div>
          <div className="flex gap-3 items-center ">
            <input
              type="checkbox"
              checked={formData.isPriority}
              onChange={(e) =>
                setFormData({ ...formData, isPriority: e.target.checked })
              }
              name="isPriority"
              id="check"
            />
            <label htmlFor="check" className="text-xl font-semibold">
              Priority
            </label>
          </div>
          <div className="mt-6 flex sm:items-center gap-5 flex-col sm:flex-row">
            <label className="text-xl font-semibold">Tags</label>
            <Select
                value={formData.tags}
              name="tags"
              options={options}
              isMulti={true}
              onChange={(opt) => setFormData({ ...formData, tags: opt })}
              styles={selectStyles}
            />
          </div>
          <div className="flex justify-end gap-5 mt-12">
            <button
              className="bg-teal-600 rounded-sm font-semibold"
              type="submit"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setIsOpen2(false)}
              className="rounded-sm font-semibold text-black bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditModal;
