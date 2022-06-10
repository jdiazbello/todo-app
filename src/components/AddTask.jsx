import React, { useState } from "react";

export const AddTask = props => {
  const [newTaskName, setNewTaskName] = useState("");

  const updatValue = e => setNewTaskName(e.target.value);

  const createNewTask = () => {
    props.callback(newTaskName);
    setNewTaskName('');
  }

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col col-lg-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              aria-describedby="basic-addon2"
              placeholder="Enter New Task"
              value={newTaskName}
              onChange={updatValue} />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={createNewTask} type="button">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
