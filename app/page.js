import Image from "next/image";
// import WorldMap from "../components/WorldMap";
// import OldWorldMap from "../components/OldWorldMap";
import NodeRanking from "../components/NodeRanking";
import "./css/worldmap.css";
// import WorldMap from "../components/newMap";
import UpdateNewMap from "../components/UpdateNewMap";

export default async function Home() {
  let nodes = {};
  try {
    const response = await fetch("http://localhost:3000/api/nodes");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    nodes = data.data;
  } catch (error) {
    console.error("Error fetching nodes data:", error);
    // Set default empty nodes object if fetch fails
    nodes = {};
  }

  return (
    <div
      className="bg-gray-100 min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: "url('/LeftWorldMap-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container flex flex-col md:flex-row justify-between gap-4 mx-auto p-4 md:px-6 md:py-7 rounded-2xl node-map-container">
        <UpdateNewMap nodes={nodes} />
        <NodeRanking nodes={nodes} />
      </div>
    </div>
  );
}
