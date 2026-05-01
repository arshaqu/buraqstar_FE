import React, { useEffect, useState, useContext } from "react";
import { Typography } from "@mui/material";
import { AuthContext } from "../AuthContext";

function RecentlyView() {
  const [items, setItems] = useState([]);
  const { currency } = useContext(AuthContext);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentProducts")) || [];

    // remove duplicates by id
    const unique = Array.from(
      new Map(stored.map(item => [item.id, item])).values()
    );

    // take LAST 7 items (no reverse)
    const lastSeven = unique.slice(-7);

    setItems(lastSeven);
  }, []);

  if (!items.length) return null;

  return (
    <div className="mt-10 px-4 lg:px-20">

      {/* TITLE */}
      <Typography sx={{ fontWeight: '600' }} className="text-2xl mb-6 poppins border-b">
        Recently <span className="text-[#2858A3]">Viewed</span>
      </Typography>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={`/product/${item.slug}`}
            className="bg-white border rounded-xl p-3 hover:shadow-lg transition-all duration-300 flex flex-col"
          >

            {/* IMAGE */}
            <div className="relative w-full h-60 p-5 flex items-center justify-center mb-3 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="max-h-full object-contain"
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col flex-grow">
              <p className="text-gray-400 text-xs mb-1">{item.code}</p>

              <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                {item.name}
              </p>

              <p className="text-[#2858A3] font-semibold text-sm mt-auto">
                {currency} {item.price}
              </p>
            </div>

          </a>
        ))}
      </div>
    </div>
  );
}

export default RecentlyView;