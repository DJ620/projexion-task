import { lazy, Suspense, useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import uuid from "react-uuid";

const Node = lazy(() => import("./Node"));

function DraggableContent({data}) {
  const [contentNodes, setContentNodes] = useState([]);

  useEffect(() => {
    if (data) {
      const nodes = data.Admin.Tree.GetContentNodes.edges;
      let nodesWithId = [];
      nodes.forEach((node) => {
        let nodeWithId = {
          title: node.node.structureDefinition.title,
          id: uuid(),
        };
        nodesWithId.push(nodeWithId);
      });
      setContentNodes(nodesWithId);
    }
  }, [data]);

  const handleOnDragEnd = (result) => {
    const items = Array.from(contentNodes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setContentNodes(items);
  };

  return (
    <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
      <Droppable droppableId="nodes">
        {(provided) => (
          <ul
            className="nodes"
            id="nodes"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {contentNodes.map((node, index) => {
              return (
                <div key={node.id} data-testid={`Node-${index}`}>
                  <Draggable draggableId={node.id} index={index}>
                    {(provided) => (
                      <div
                        className="max-w-72 ml-5"
                        id={node.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Suspense fallback={<div>loading...</div>}>
                          <Node node={node} />
                        </Suspense>
                      </div>
                    )}
                  </Draggable>
                </div>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableContent;