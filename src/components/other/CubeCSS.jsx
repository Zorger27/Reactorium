import React from "react";
import "@/components/other/CubeCSS.scss";

export default function CubeCSS() {

  return (
    <div className="cube-css-container">
      <div className="body">
        <div className="container">
          <div className="back side"></div>
          <div className="left side"></div>
          <div className="right side"></div>
          <div className="top side"></div>
          <div className="bottom side"></div>
          <div className="front side"></div>
        </div>
      </div>
    </div>
  )
}