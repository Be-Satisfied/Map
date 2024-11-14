"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import worldData from "world-atlas/countries-50m.json";
import { feature } from "topojson-client";

const COUNTRY_NAME_MAPPING = {
  "United States": "United States of America",
  USA: "United States of America",
  UK: "United Kingdom",
  Russia: "Russian Federation",
  "South Korea": "Korea, Republic of",
  // 可以根据需要添加更多映射
};

const WorldMap = ({ nodes }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState({ country: "", nodes: 0 });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Calculate total nodes and ranking list
  const normalizedNodes = Object.entries(nodes).reduce(
    (acc, [country, count]) => {
      const normalizedCountry = COUNTRY_NAME_MAPPING[country] || country;
      acc[normalizedCountry] = count;
      return acc;
    },
    {}
  );

  const totalNodes = Object.values(normalizedNodes).reduce(
    (sum, count) => sum + count,
    0
  );
  const rankingList = Object.entries(normalizedNodes)
    .sort(([, a], [, b]) => b - a)
    .map(([country, count]) => ({
      country:
        Object.entries(COUNTRY_NAME_MAPPING).find(
          ([k, v]) => v === country
        )?.[0] || country,
      count,
      percentage: ((count / totalNodes) * 100).toFixed(1),
    }));

  // Find maximum nodes for percentage calculation
  const maxNodes = Math.max(...Object.values(normalizedNodes));

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Calculate dimensions based on container size
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = isMobile ? 300 : 500;

    // Update SVG dimensions
    svg.attr("width", containerWidth).attr("height", containerHeight);

    const g = svg.append("g");

    // 修改投影设置
    const projection = d3
      .geoEquirectangular()
      .scale(containerWidth / (2 * Math.PI))
      .translate([containerWidth / 2, containerHeight / 2]);

    const path = d3.geoPath().projection(projection);

    // 绘制国家
    const countries = feature(worldData, worldData.objects.countries);
    countries.features = countries.features.filter(
      (d) => d.properties.name !== "Antarctica"
    );

    g.selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("fill", (d) => {
        const countryName = d.properties.name;
        const normalizedName = COUNTRY_NAME_MAPPING[countryName] || countryName;
        return nodes[normalizedName] ? "#dbeafe" : "#ffffff";
      })
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", "0.5")
      .style("cursor", "pointer")
      .on("mousemove", (event, d) => {
        const countryName = d.properties.name;
        const nodeCount = normalizedNodes[countryName] || 0;
        setHoverInfo({
          country:
            Object.entries(COUNTRY_NAME_MAPPING).find(
              ([k, v]) => v === countryName
            )?.[0] || countryName,
          nodes: nodeCount,
        });
        const rect = containerRef.current.getBoundingClientRect();
        setTooltipPosition({
          x: event.clientX - rect.left + 10,
          y: event.clientY - rect.top - 10,
        });
        d3.select(event.currentTarget)
          .attr("fill", "#60a5fa")
          .attr("stroke", "#3b82f6")
          .attr("stroke-width", "1");
      })
      .on("mouseout", (event, d) => {
        const countryName = d.properties.name;
        d3.select(event.currentTarget)
          .attr("fill", normalizedNodes[countryName] ? "#dbeafe" : "#ffffff")
          .attr("stroke", "#cbd5e1")
          .attr("stroke-width", "0.5");
        setHoverInfo({ country: "", nodes: 0 });
      });
  }, [nodes, isMobile]);

  return (
    <div className="flex flex-col items-center bg-white p-4 md:p-6 rounded-2xl">
      <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6">
        <div
          className={`${
            isMobile ? "w-full" : "w-3/4"
          } bg-white rounded-xl shadow-sm`}
        >
          <div
            className="relative"
            style={{
              height: isMobile ? "300px" : "500px",
              width: "100%",
            }}
            ref={containerRef}
          >
            <svg
              ref={svgRef}
              className="absolute top-0 left-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            ></svg>
            {hoverInfo.country && (
              <div
                className="absolute bg-white border border-gray-100 rounded-lg p-3 shadow-xl pointer-events-none z-10"
                style={{
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y}px`,
                  transform: "translate(-50%, -80%)",
                }}
              >
                <p className="text-sm font-medium text-gray-800">
                  <span className="font-bold">{hoverInfo.country}</span>
                  <br />
                  <span className="text-blue-600">{hoverInfo.nodes}</span> nodes
                  <span className="text-gray-500">
                    {" "}
                    ({((hoverInfo.nodes / totalNodes) * 100).toFixed(1)}%)
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={`${isMobile ? "w-full" : "w-1/4"}`}>
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
            Node Distribution
          </h2>
          <div
            className="bg-gray-100 rounded-xl p-4 md:p-6 shadow-sm overflow-hidden"
            style={{
              height: isMobile ? "300px" : "452px", // 500px - 48px for title
            }}
          >
            <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
              {rankingList.map((item, index) => (
                <div
                  key={item.country}
                  className="mb-4 last:mb-0 hover:bg-white hover:shadow-sm rounded-lg p-3 transition-all duration-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-700">
                        {item.country}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-blue-600">
                      {item.count}
                      <span className="text-gray-400 ml-1">
                        ({item.percentage}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
