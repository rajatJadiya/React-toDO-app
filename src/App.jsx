import React, { useState } from "react";
import { createContext } from "react";
import { Toaster } from "react-hot-toast";
import EditModal from "./components/EditModal";
import TaskModal from "./components/TaskModal";
import TodoContent from "./components/TodoContent";
import TodoFilters from "./components/TodoFilters";
import TodoHeader from "./components/TodoHeader";
import TodoInputTask from "./components/TodoInputTask";

export const AppContext = createContext();

const App = () => {

  // for controlling the state of Create Detailed Task Modal
  const [isOpen, setIsOpen] = useState(false);

  // for controlling the state of Edit Task Modal
  const [isOpen2, setIsOpen2] = useState(false);
  
  const [taskId, setTaskId] = useState(null)
  
  const TOASTER_STYLES ={
    style:{
      fontSize: '1.2rem'
    }
  }
  
  return (
    <>
    <AppContext.Provider value={{ isOpen, setIsOpen,taskId, setTaskId,isOpen2, setIsOpen2 }}>
      <div>
        <div className="container mx-auto px-4">
          <div className="max-w-[50rem] mx-auto my-[2.5rem] shadow-2xl p-8 bg-white">
            <TodoHeader />
            <TodoInputTask />
            <TodoFilters />
            <TodoContent />
            <TaskModal />
            <EditModal />
          </div>
        </div>
      </div>
    </AppContext.Provider>
    <Toaster position="bottom-right" toastOptions={TOASTER_STYLES} />
    </>
  );
};

export default App;
