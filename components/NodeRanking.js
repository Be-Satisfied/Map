"use client";

import React, { useEffect, useRef, useState } from "react";
import { getCountryNameByCode, getRegionByCountry } from "@/app/utis/address";

const NodeRanking = ({ nodes }) => {
  // 搜索框
  const [search, setSearch] = useState("");

  // 处理搜索
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  // 过滤并转换数据
  const filteredNodes =
    nodes &&
    Object.entries(nodes)
      .map(([code, count]) => ({
        code,
        name: getCountryNameByCode(code),
        count,
      }))
      .filter(
        (node) =>
          node.name.toLowerCase().includes(search.toLowerCase()) ||
          node.code.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => b.count - a.count);

  // 获取总节点数
  const totalNodes = nodes
    ? Object.values(nodes).reduce((acc, curr) => acc + curr, 0)
    : 0;

  return (
    <div
      className="w-2/5 h-full max-h-[543px]   p-4 rounded-[10px] flex flex-col box-shadow box-border"
      style={{ background: "rgba(255, 255, 255, 0.50)" }}
    >
      <h2 className="text-2xl font-semibold mb-4 border-b border-[#BABABA] pb-2 flex flex-row items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <ellipse cx="15" cy="28.3924" rx="15" ry="1.60758" fill="#495EDB" />
          <path
            d="M22.5764 3.1391C18.3921 -1.04637 11.6087 -1.04637 7.42439 3.1391C3.24005 7.32457 3.24005 14.1098 7.42439 18.2953L13.7153 24.6885C14.3899 25.3741 15.4947 25.3789 16.1753 24.6981L22.5764 18.2953C26.7608 14.1098 26.7608 7.32338 22.5764 3.1391ZM15.001 17.0631C11.4973 17.0631 8.6562 14.2213 8.6562 10.7166C8.6562 7.21191 11.4973 4.37125 15.001 4.37125C18.5047 4.37125 21.3446 7.21191 21.3446 10.7166C21.3446 14.2213 18.5047 17.0631 15.001 17.0631Z"
            fill="#495EDB"
          />
        </svg>{" "}
        Node Distribution
      </h2>
      <form
        className="flex flex-row justify-between"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* 搜索框和按钮 */}
        <div className="flex flex-row items-center w-full">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by country name or code"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none   focus:border-transparent"
            style={{
              width: "100%",
              borderWidth: "1px",
              borderColor: "#d1d5db",
              borderRadius: "0.375rem 0 0 0.375rem",
              outline: "none",
              height: "48px",
              paddingLeft: "10px",
              borderRight: "none",
              border: "1px solid #495EDB",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#495EDB",
              maxWidth: "100px",
              minWidth: "100px",
              padding: "14px 10px",
              height: "48px",
              borderRadius: "0 0.375rem 0.375rem 0",
              borderLeft: "none",
            }}
            className="flex items-center justify-center w-[100px] h-[50px] text-white rounded-md cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
            >
              <path
                d="M26.4804 24.9776C28.5413 22.5626 29.7104 19.499 29.7104 16.2722C29.7107 8.8496 23.6945 2.83337 16.2722 2.83337C8.84996 2.83337 2.83337 8.84996 2.83337 16.2719C2.83337 23.6941 8.84996 29.7111 16.2719 29.7111C17.6018 29.7122 18.9245 29.5158 20.1968 29.1285C20.4647 29.045 20.6887 28.8588 20.8199 28.6107C20.951 28.3626 20.9787 28.0727 20.8969 27.8042C20.815 27.5358 20.6303 27.3106 20.383 27.1779C20.1357 27.0452 19.8459 27.0157 19.577 27.0959C18.5056 27.422 17.3918 27.5872 16.2719 27.5861C10.0237 27.5857 4.95837 22.5204 4.95837 16.2719C4.95837 10.0237 10.0237 4.95837 16.2719 4.95837C22.5204 4.95837 27.5861 10.0237 27.5861 16.2719C27.5861 19.2362 26.4113 22.0391 24.3607 24.1517C24.136 24.3832 24.0113 24.6938 24.0137 25.0164C24.0161 25.339 24.1453 25.6477 24.3734 25.8758L29.353 30.8554C29.5528 31.052 29.8222 31.1617 30.1025 31.1606C30.3828 31.1595 30.6513 31.0477 30.8495 30.8495C31.0477 30.6513 31.1596 30.3828 31.1608 30.1025C31.1619 29.8223 31.0523 29.5528 30.8558 29.353L26.4804 24.9776Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* 列表 */}
      <div className="mt-4 space-y-2 flex-1 node-ranking-list">
        {filteredNodes &&
          filteredNodes.map((node, index) => (
            <div
              key={node.code}
              className={`flex flex-col w-full p-2 rounded-lg transition-all duration-200 hover:bg-white hover:shadow-md ${
                index % 2 === 0 ? "bg-[#d6dffd]" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium bg-[#495EDB] rounded-full w-[30px] h-[30px] overflow-clip p-2 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="font-medium text-black text-2xl">
                    {node.name} ({node.code})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#495EDB] text-xl">{node.count}</span>
                  <span className="text-gray-500 text-xl">
                    ({((node.count / totalNodes) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-[#495EDB] rounded-full"
                  style={{
                    width: `${(node.count / totalNodes) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NodeRanking;
