import { useEffect, useState } from "react";
import { getNodes } from "../utils/Queries";
import { useQuery } from "@apollo/client";
import StoredInfo from "../utils/StoredInfo";
import LogoutButton from "../components/LogoutButton";
import DraggableContent from "../components/DraggableContent";

function Home() {
  const { loading, error, data } = useQuery(getNodes);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(StoredInfo.getUsername());
  }, []);

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
      <DraggableContent data={data} />
    </div>
  );
}

export default Home;
