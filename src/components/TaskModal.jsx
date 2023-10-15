import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../App";
import Select from "react-select";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../reducers/tasksSlice";
import { toast } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  taskName: Yup.string().required("Task Field cannot be empty!"),
});

const TaskModal = () => {

  const todo = useSelector((store) => store.todo.todoList);
  const { isOpen, setIsOpen, taskId } = useContext(AppContext);
  const dispatch = useDispatch();

  const initialValues = {
    taskName: "",
        description: "",
        isPriority: false,
        tags: [],
        isCompleted: false,
        time: new Date().toLocaleString(),
        id: todo.length === 0 ? 1 : todo.length + 1,
  }

  const onSubmit = (values) => {
      dispatch(addTask(values));
      setIsOpen(false);
      toast.success("Task has been added successfully!");  
  };


  const options = [
    { value: "work", label: "WorK" },
    { value: "personal", label: "Personal" },
    { value: "important", label: "Important" },
  ];
  
  const selectStyles = {
    control: (styles, state) => {
      return {
        ...styles,
        display: "inline-flex",
        border: state.isFocused ? "2px solid #99f6e4" : "2px solid #0f766e",
      };
    },
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed bg-black/40 inset-0"></div>
      <div className=" bg-white fixed top-[1rem] left-[1rem] right-[1rem] bottom-[1rem] lg:bottom-auto lg:right-auto lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold mr-12 text-teal-700">
            Create Task
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-red-500 bg-gray-300"
            >
            <MdOutlineClose className="text-black" />
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <div className="my-8">
                <Field
                  name={"taskName"}
                  type="text"
                  placeholder="Enter task..."
                  className="border-2 border-teal-600 rounded-md p-3 focus:outline-4 focus:outline-teal-200 font-mono text-2xl w-full"
                />
                <ErrorMessage
                  component={"div"}
                  className="text-red-600"
                  name="taskName"
                />
              </div>
              <div className="my-8">
                <Field
                  name={"description"}
                  as={"textarea"}
                  placeholder="Enter description"
                  className="border-2 border-teal-600 rounded-md p-3 focus:outline-4 focus:outline-teal-200 font-mono text-2xl resize-none w-full"
                  rows={5}
                  cols={40}
                />
              </div>
              <div className="flex gap-3 items-center ">
                <Field type="checkbox" name="isPriority" id="check" />
                <label htmlFor="check" className="text-xl font-semibold">
                  Priority
                </label>
              </div>
              <div className="mt-6 flex sm:items-center gap-5 flex-col sm:flex-row">
                <label className="text-xl font-semibold">Tags</label>
                <Select
                  name="tags"
                  options={options}
                  isMulti={true}
                  onChange={(opt) => formik.setFieldValue("tags", opt)}
                  styles={selectStyles}
                />
              </div>
              <div className="flex justify-end gap-5 mt-12">
                <button
                  className="bg-teal-600 rounded-sm font-semibold"
                  type="submit"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-sm font-semibold text-black bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default TaskModal;
