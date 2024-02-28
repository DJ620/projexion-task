import { useEffect, useState } from "react";
import { getNodes } from "../../utils/Queries";
import { useQuery } from "@apollo/client";

function Home() {
  const { loading, error, data } = useQuery(getNodes);
  const [contentNodes, setContentNodes] = useState([]);

  useEffect(() => {
    if (data) {
      setContentNodes(data.Admin.Tree.GetContentNodes.edges);
    }
  }, [data]);

  useEffect(() => {
    if (contentNodes.length > 0) {
        console.log({contentNodes});
    };
  }, [contentNodes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Home</div>;
}

export default Home;
