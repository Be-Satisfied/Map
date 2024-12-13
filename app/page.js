"use client";
import Image from "next/image";
// import WorldMap from "../components/WorldMap";
// import OldWorldMap from "../components/OldWorldMap";
import NodeRanking from "../components/NodeRanking";
import "./css/worldmap.css";
import WorldMap from "../components/newMap";
// import UpdateNewMap from "../components/UpdateNewMap";

import { useState } from "react";

export default function Home() {
  const nodes = {
    US: 2479,
    KR: 358,
    RU: 39,
    BE: 15,
    CN: 45,
    HK: 237,
    BD: 3,
    SG: 200,
    CA: 320,
    IT: 17,
    HU: 15,
    SE: 95,
    MO: 14,
    AU: 132,
    ZA: 29,
    JP: 34,
    CZ: 7,
    IE: 7,
    TW: 46,
    GB: 163,
    FI: 23,
    CY: 2,
    AE: 81,
    FR: 6,
    NO: 23,
    GU: 2,
    CH: 22,
    AT: 14,
    RO: 29,
    NL: 45,
    PH: 5,
    ID: 12,
    MT: 3,
    DE: 31,
    LT: 42,
    CL: 10,
    TH: 6,
    PT: 19,
    EE: 7,
    PA: 9,
    CO: 3,
    PL: 5,
    DK: 10,
    LV: 12,
    BG: 24,
    ES: 10,
    SK: 7,
    BR: 8,
    KW: 9,
    NZ: 15,
    GR: 2,
    AR: 3,
    PF: 1,
    HR: 3,
    GE: 9,
    UA: 17,
    VE: 3,
    SI: 8,
    NC: 1,
    MY: 33,
    EC: 2,
    IL: 4,
    MK: 1,
    PK: 5,
    EG: 2,
    BM: 1,
    IN: 13,
    IS: 4,
    AD: 3,
    MX: 6,
    PR: 1,
    AL: 1,
    NA: 2,
    AO: 2,
    TR: 32,
    KH: 1,
    SA: 5,
    AZ: 2,
    CR: 1,
    MZ: 1,
    BS: 1,
    GH: 1,
    IQ: 1,
    UG: 1,
    IM: 1,
    VN: 1,
    KY: 1,
    MD: 1,
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
        <WorldMap nodes={nodes} />
        <NodeRanking nodes={nodes} />
      </div>
    </div>
  );
}
