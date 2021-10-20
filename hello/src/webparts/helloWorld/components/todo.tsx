import * as React from 'react';

import {useState} from 'react';

import { IHelloWorldProps } from './IHelloWorldProps';
 
function simplehooks(props: IHelloWorldProps) {
  return <div>hello from logic 2 {props.description}</div>
}
const App = () => {
  const [newTask, setNewTask] = useState("");

  const onInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const [tasks, setTasks] = useState([
    { task: "Wash the car", isComplete: false },
    { task: "Do Gardening", isComplete: true },
    { task: "Buy Groceries", isComplete: false }
  ]);

  const addTask = () => {
    const taskObject = {
      task: newTask,
      isComplete: false
    };
    // setTasks(tasks.concat(taskObject)); // method 1
    setTasks([...tasks, taskObject]); // method 2
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, taskIndex) => {
        if (taskIndex === index) {
          return {
            ...task,
            isComplete: !task.isComplete
          };
        }

        return task;
      })
    );
  };

  return (
    <React.Fragment>
       <h1>ToDoList App</h1>
       <ul>
        {tasks.map((taskObject, index) => {
          const clickedTask = () => {
            toggleTask(index);
          };

          return (
            <li onClick={clickedTask} key={index}>
              {taskObject.task} {taskObject.isComplete ? "✔️" : "⏱"}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
   
  );
};
export default App;