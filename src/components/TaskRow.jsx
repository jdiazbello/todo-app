import React from "react";

export const TaskRow = props => (
  <tr key={props.task.id}>
    <td>{props.task.name}</td>
    <td>
      <input
        type="checkbox"
        checked={props.task.completed}
        onChange={() => props.callBack(props.task)}
      />
    </td>
  </tr>
);