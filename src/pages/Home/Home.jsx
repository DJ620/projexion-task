import { useEffect, useState, lazy, Suspense } from "react";
import { getNodes } from "../../utils/Queries";
import { useQuery } from "@apollo/client";
import StoredInfo from "../../utils/StoredInfo";
import LogoutButton from "../../components/LogoutButton";
import uuid from "react-uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Node = lazy(() => import("../../components/Node"));

function Home() {
  const { loading, error, data } = useQuery(getNodes);
  const [username, setUsername] = useState("");
  const [contentNodes, setContentNodes] = useState([]);

  useEffect(() => {
    setUsername(StoredInfo.getUsername());
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

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("error", error);
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <div className="flex justify-between items-center px-20 mb-5 h-16 bg-gray-800 sticky top-0 w-full">
        <p className="font-bold text-lg text-white">Welcome, {username}</p>
        <LogoutButton />
      </div>
      {contentNodes.length > 0 && (
        <div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
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
                      <Suspense key={node.id} fallback={<div>loading...</div>}>
                        <Node node={node} index={index} />
                      </Suspense>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  );
}

export default Home;
