import React from "react";
import { RxDragHandleHorizontal } from "react-icons/rx";

function Node({ node }) {
  return (
        <li
          draggable
          className="bg-gray-300 shadow-md rounded-md p-4 mb-4 height-30-vh hover:bg-gray-400 active:bg-gray-500"
          data-testid="node-item"
        >
          <RxDragHandleHorizontal className="size-7 text-green-500 absolute"/>
          <p className="text-gray-800 font-bold h-full flex items-center justify-center" data-testid="node-title">{node.title}</p>
        </li>
  );
}

export default Node;
