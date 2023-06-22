import React from "react";
import { arrowTypesHandler } from "../utils/Features";

const ControllerButton = ({ snakeMoveHandler, direction, type, Icon }) => {
  return (
    <div
      className="controller-btn"
      onClick={() => {
        if (arrowTypesHandler(direction, type)) {
          snakeMoveHandler(type);
        }
      }}
    >
      <Icon />
    </div>
  );
};

export default ControllerButton;
