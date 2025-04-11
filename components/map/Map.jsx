"use client";

import React, { useRef, useState, useEffect } from "react";
import { zoom } from "d3-zoom";
import { select } from "d3-selection";
import { MapGroupSvg, slotsGroupSvg } from "./constant";
import "d3-transition";

export default function Map() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const svgRef = useRef(null);
  const gRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    const g = select(gRef.current);

    const zoomBehavior = zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform.toString());
      });

    svg.call(zoomBehavior);
  }, []);

  const handleSlotClick = (index) => {
    setSelectedSlot((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex-1 ">
      <svg
        ref={svgRef}
        width="1400"
        height="800"
        viewBox="0 0 632 701"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="border rounded shadow"
      >
        <rect width="632" height="701" fill="#ffffff" />
        <g ref={gRef}>
          <g id="slots">
            {slotsGroupSvg.map((slot, index) => (
              <path
                key={index}
                d={slot}
                fill={index === selectedSlot ? "#10B981" : "#A3A3A3"}
                stroke={index === selectedSlot ? "#10B951" : "none"}
                strokeWidth={index === selectedSlot ? 1 : 0}
                cursor="pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSlotClick(index);
                }}
              />
            ))}
          </g>
          {MapGroupSvg}
        </g>
      </svg>
    </div>
  );
}
