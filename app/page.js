import Image from "next/image";
// import WorldMap from "../components/WorldMap";
// import OldWorldMap from "../components/OldWorldMap";
import NodeRanking from "../components/NodeRanking";
import "./css/worldmap.css";
// import WorldMap from "../components/newMap";
import UpdateNewMap from "../components/UpdateNewMap";

export default async function Home() {
  // let nodes = {};
  // try {
  //   // 使用相对路径，这样在vercel部署时会自动使用正确的域名
  //   const response = await fetch("/api/nodes");
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   const data = await response.json();
  //   nodes = data.data;
  // } catch (error) {
  //   console.error("Error fetching nodes data:", error);
  //   // Set default empty nodes object if fetch fails
  //   nodes = {};
  // }
  const nodes = {
    // North America
    US: 1056,
    CA: 52,
    MX: 39,

    // West Europe
    FR: 61,
    GB: 65,
    BE: 36,
    IE: 34,
    NL: 34,

    // Middle Europe
    DE: 68,
    AT: 37,
    CH: 547,

    // South Africa
    ZA: 25,
    NA: 14,
    BW: 9,

    // North Europe
    DK: 35,
    FI: 34,
    NO: 39,
    SE: 45,

    // East Europe
    RU: 89,
    PL: 123,
    CZ: 27,
    HU: 24,

    // West Asia
    TR: 41,
    SA: 29,
    AE: 24,
    IL: 24,

    // South Asia
    IN: 128,
    PK: 24,
    BD: 14,

    // South-East Asia
    SG: 44,
    ID: 37,
    MY: 20,
    TH: 22,

    // East Asia
    CN: 556,
    JP: 72,
    KR: 48,
    TW: 34,

    // Oceania
    AU: 45,
    NZ: 24,
    FJ: 14,
  };
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
