import Image from "next/image";
import WorldMap from "../components/WorldMap";

export default function Home() {
  // return <h2>Hello World</h2>;
  const width = 800;
  const height = 450;

  // Example node count data
  const nodes = {
    China: 156,
    "United States": 203,
    India: 128,
    Russia: 89,
    Brazil: 76,
    Japan: 72,
    Germany: 68,
    "United Kingdom": 65,
    France: 61,
    Italy: 58,
    Canada: 52,
    "South Korea": 48,
    Australia: 45,
    Spain: 42,
    Mexico: 39,
    Indonesia: 37,
    Netherlands: 34,
    Turkey: 31,
    "Saudi Arabia": 29,
    Switzerland: 27,
    Sweden: 25,
    Poland: 23,
    Belgium: 21,
    Norway: 19,
    Austria: 17,
    Denmark: 15,
    Singapore: 14,
    Thailand: 12,
    Malaysia: 10,
    Vietnam: 8,
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-center mt-10">
        World Map - Node Distribution
      </h1>
      <WorldMap width={890} height={500} nodes={nodes} />
    </div>
  );
}
