import React from "react";
import { TaskRow } from "./TaskRow";



export const TaskTable = props => {

    const callBack = task => {
        props.callback(task);
    }

    return (
        <div key={props.Title} className="col">
            <div className="card text-center">
                <div className={`card-header ${props.completed ? "bg-success" : "bg-warning"}`} >
                    {props.Title}
                </div>
                <div className="card-body">
                    <table className="table table-striped table-bordered ">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Done</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.items
                                    .map(task => (
                                        <TaskRow key={task.id} task={task} callBack ={callBack}/>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}