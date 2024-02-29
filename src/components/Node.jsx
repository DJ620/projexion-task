import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { RxDragHandleHorizontal } from "react-icons/rx";

function Node({ node, index }) {
  return (
    <Draggable draggableId={node.id} index={index}>
      {(provided) => (
        <li
          draggable
          id={node.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-gray-300 max-w-72 shadow-md rounded-md p-4 mb-4 ml-5 height-30-vh hover:bg-gray-400 active:bg-gray-500"
        >
          <RxDragHandleHorizontal className="size-7 text-green-500"/>
          <p className="text-gray-800 text-center font-bold mt-24">{node.title}</p>
        </li>
      )}
    </Draggable>
  );
}

export default Node;
