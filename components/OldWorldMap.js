"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import worldData from "world-atlas/countries-50m.json";
import {
  getRegionByCountry,
  CONTINENTS,
  getCountryNameByCode,
  COUNTRY_NAME_MAPPING,
} from "@/app/utis/address";
import { feature } from "topojson-client";

const WorldMap = ({ nodes = {} }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 460 });

  // Normalize nodes data using getCountryNameByCode
  const normalizedNodes = Object.entries(nodes).reduce(
    (acc, [country, count]) => {
      const normalizedCountry = getCountryNameByCode(country);
      acc[normalizedCountry] = count;
      return acc;
    },
    {}
  );

  const totalNodes = Object.values(normalizedNodes).reduce(
    (sum, count) => sum + count,
    0
  );

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("width", dimensions.width).attr("height", dimensions.height);

    const projection = d3
      .geoMercator()
      .scale(dimensions.width / 3 / Math.PI)
      .translate([dimensions.width / 2.2, dimensions.height / 1.6])
      .center([0, 0]);

    const path = d3.geoPath().projection(projection);

    // Create tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "#FFFFFF")
      .style("padding", "12px")
      .style("border-radius", "8px")
      .style("pointer-events", "none")
      .style("z-index", "10");

    // Draw countries
    const countries = feature(worldData, worldData.objects.countries);
    countries.features = countries.features.filter(
      (d) => d.properties.name !== "Antarctica"
    );

    svg
      .selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => {
        const countryName = getCountryNameByCode(d.properties.name);
        return normalizedNodes[countryName] ? "#4460FF" : "#B7C2FF";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", "0.2")
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        const countryName = getCountryNameByCode(d.properties.name);
        const nodeCount = normalizedNodes[countryName] || 0;
        const percentage = ((nodeCount / totalNodes) * 100).toFixed(1);

        tooltip.style("visibility", "visible").html(`
            <div style="background: #FFFFFF;">
              <p style="margin: 0; color: #1F2937; font-size: 14px;">
                <span style="font-weight: bold;">${countryName}</span><br/>
                <span style="color: #2563EB;">${nodeCount}</span> nodes
                <span style="color: #6B7280;"> (${percentage}%)</span>
              </p>
            </div>
          `);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
      });

    return () => {
      tooltip.remove();
    };
  }, [nodes, dimensions, normalizedNodes, totalNodes]);

  return (
    <div
      className="w-3/4 h-full max-h-[600px] p-4 rounded-[10px] box-shadow box-border"
      style={{ background: "rgba(255, 255, 255, 0.50)" }}
    >
      <h2 className="flex flex-row border-b-1 border-[#BABABA] pb-2 items-center gap-2 text-2xl font-semibold mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M16 8.5L16 8.39788C15.0749 8.39775 14.1514 8.32074 13.2391 8.16767C13.6717 6.46568 14.2071 5.16763 14.7168 4.29291C14.9771 3.84614 15.2289 3.51291 15.4544 3.29284C15.684 3.06868 15.8703 2.97755 16 2.97755C16.1297 2.97755 16.316 3.06868 16.5456 3.29284C16.7711 3.51291 17.0229 3.84614 17.2832 4.29291C17.7929 5.1676 18.3283 6.46559 18.7609 8.16748C17.8483 8.31903 16.9249 8.3961 15.9998 8.39788L16 8.5ZM16 8.5C15.0664 8.49987 14.1346 8.42193 13.2141 8.26701L18.7859 8.26684C17.8652 8.42021 16.9335 8.4982 16 8.5ZM24.4172 6.08229C23.2785 6.76762 22.0583 7.30748 20.7852 7.68919C20.357 5.96893 19.7979 4.50458 19.1439 3.36882C21.0868 3.85483 22.8916 4.78332 24.4172 6.08229ZM12.851 3.37547C12.2024 4.50256 11.6468 5.97069 11.2161 7.68823C9.94147 7.30718 8.71935 6.76878 7.57798 6.08551C9.10341 4.78723 10.9083 3.85986 12.851 3.37547ZM16 10.4775C17.0671 10.4771 18.132 10.3861 19.1836 10.2057C19.4424 11.7771 19.5913 13.3646 19.6293 14.9567H12.3638C12.4003 13.3645 12.5492 11.7769 12.8095 10.2057C13.8633 10.3867 14.9306 10.4776 16 10.4775H16ZM11.2142 24.3154C11.6462 26.028 12.2017 27.4958 12.8544 28.6258C10.9122 28.1413 9.10791 27.214 7.58289 25.916C8.72098 25.2316 9.94108 24.6938 11.2142 24.3154ZM16 0.89788C13.0131 0.89788 10.0932 1.7836 7.60972 3.44305C5.12619 5.10249 3.19051 7.46111 2.04747 10.2207C0.904423 12.9802 0.605351 16.0167 1.18807 18.9463C1.77079 21.8758 3.20912 24.5667 5.32119 26.6788C7.43326 28.7909 10.1242 30.2292 13.0537 30.8119C15.9832 31.3946 19.0198 31.0956 21.7793 29.9525C24.5389 28.8095 26.8975 26.8738 28.557 24.3903C30.2164 21.9068 31.1021 18.9869 31.1021 16C31.1017 11.9948 29.5104 8.15378 26.6783 5.32169C23.8462 2.48959 20.0052 0.898338 16 0.89788ZM28.9699 14.9601L21.7006 14.9568C21.6616 13.2043 21.4951 11.4569 21.2024 9.72856C22.8715 9.24881 24.4619 8.52845 25.9233 7.59016C27.6889 9.66528 28.7549 12.2444 28.9699 14.9601ZM10.7908 9.73026C10.4982 11.4597 10.3317 13.2082 10.2926 14.9618L3.02507 14.9568C3.24389 12.2431 4.31147 9.6668 6.07664 7.59358C7.53596 8.5309 9.12402 9.25068 10.7908 9.73026ZM28.9682 17.0415C28.7534 19.7565 27.688 22.3349 25.9233 24.4098C24.4641 23.4715 22.8761 22.7507 21.2092 22.2698C21.5016 20.5414 21.6681 18.7941 21.7074 17.0415H28.9682ZM19.1804 21.7976C17.0747 21.433 14.9221 21.433 12.8164 21.7976C12.5577 20.2262 12.4088 18.6387 12.3707 17.0467H19.6261C19.5912 18.6389 19.4423 20.2266 19.1804 21.7976ZM6.07675 24.4064C4.31385 22.3316 3.25019 19.7537 3.03686 17.0398H10.2943C10.3342 18.7934 10.5007 20.5418 10.7926 22.2714C9.12529 22.7503 7.53667 23.4695 6.07675 24.4064ZM16 29.0224C15.8703 29.0224 15.684 28.9313 15.4544 28.7072C15.2289 28.4871 14.9771 28.1539 14.7168 27.7071C14.2071 26.8324 13.6717 25.5343 13.2391 23.8323C15.0669 23.5254 16.9331 23.5254 18.7609 23.8323C18.3283 25.5343 17.7929 26.8324 17.2832 27.7071C17.0229 28.1539 16.7711 28.4871 16.5456 28.7072C16.316 28.9313 16.1297 29.0224 16 29.0224ZM24.4188 25.9094C22.8938 27.2108 21.0883 28.1406 19.1443 28.6264C19.7978 27.4955 20.3565 26.0212 20.7843 24.3087C22.0576 24.6892 23.2785 25.227 24.4188 25.9094Z"
            fill="#495EDB"
            stroke="#495EDB"
            strokeWidth="0.20424"
          />
        </svg>
        World Map - Node Distribution
      </h2>
      <div
        ref={containerRef}
        className="relative h-full flex items-center justify-center"
      >
        <div className="flex items-center justify-center w-full h-[450px]">
          <svg
            ref={svgRef}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          ></svg>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
