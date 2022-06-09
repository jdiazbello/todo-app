import React from "react";

export const Header = props => (
  <h4 className="bg-primary text-white text-center p-4">
    TODO App ({props.taskItems.filter(t => !t.completed).length} task(s) to do)
  </h4>
);