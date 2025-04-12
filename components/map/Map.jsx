"use client";

import React, { useRef, useState, useEffect } from "react";
import { zoom } from "d3-zoom";
import { select } from "d3-selection";
import { MapGroupSvg, slotsGroupSvg } from "./constant";
import "d3-transition";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Map() {
  const router = useRouter();
  const supabase = createClient();

  const svgRef = useRef(null);
  const gRef = useRef(null);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const fetchBooked = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("slot_index");
      if (data) setBookedSlots(data.map((item) => item.slot_index));
    };
    fetchBooked();
  }, []);

  const handleSlotClick = (index) => {
    if (bookedSlots.includes(index)) return;
    setSelectedSlot(index);
    router.push(`/protected/book-slot?slot=${index}`);
  };

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
            {slotsGroupSvg.map((slot, index) => {
              const isBooked = bookedSlots.includes(index);
              const isSelected = index === selectedSlot;
              return (
                <path
                  key={index}
                  d={slot}
                  fill={
                    isBooked ? "#EF4444" : isSelected ? "#10B981" : "#A3A3A3"
                  }
                  stroke={isSelected ? "#10B951" : "none"}
                  strokeWidth={isSelected ? 1 : 0}
                  cursor={isBooked ? "not-allowed" : "pointer"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSlotClick(index);
                  }}
                />
              );
            })}
          </g>
          {MapGroupSvg}
        </g>
      </svg>
    </div>
  );
}
