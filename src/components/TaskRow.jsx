import React from "react";

export const TaskRow = props => (
   <tr key={props.task.id}>
    <td>{props.task.name}</td>
    
  </tr>
);