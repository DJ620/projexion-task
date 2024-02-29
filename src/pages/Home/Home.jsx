import { useEffect, useState, lazy, Suspense } from "react";
import { getNodes } from "../../utils/Queries";
import { useQuery } from "@apollo/client";
import StoredInfo from "../../utils/StoredInfo";
import LogoutButton from "../../components/LogoutButton";

const Node = lazy(() => import("../../components/Node"));

function Home() {
  const { loading, error, data } = useQuery(getNodes);
  const [username, setUsername] = useState("");
  const [contentNodes, setContentNodes] = useState([]);

  useEffect(() => {
    setUsername(StoredInfo.getUsername());
    if (data) {
      const nodes = data.Admin.Tree.GetContentNodes.edges;
      setContentNodes(nodes);
    }
  }, [data]);

  useEffect(() => {
    if (contentNodes.length > 0) {
      console.log({ contentNodes });
    }
  }, [contentNodes]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("error", error);
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <div style={{display: "flex", justifyContent:"space-between", alignItems:"center", padding: "0px 50px"}}>
        <p>Welcome, {username}</p>
        <LogoutButton />
      </div>
      {contentNodes.length > 0 && (
        <div>
          <ul>
            {contentNodes.map((node, index) => {
              return (
                <Suspense key={index} fallback={<div>loading...</div>}>
                  <Node node={node.node.structureDefinition.title} />
                </Suspense>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
