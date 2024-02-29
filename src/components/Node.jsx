import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Node({ node, index, provided }) {
  return (
    <Draggable draggableId={node.id} index={index}>
      {(provided) => (
        <li
          draggable
          id={node.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p style={{ height: "30vh" }}>{node.title}</p>
        </li>
      )}
    </Draggable>
  );
}

export default Node;
