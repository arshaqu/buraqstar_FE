import React, { useEffect, useState, useContext } from "react";
import { Typography, Box } from "@mui/material";
import { AuthContext } from "../AuthContext";
import { ImageURL } from "../constants";
import { AddToCart, AddToWishlist } from "./index";

function RecentlyView() {
  const [items, setItems] = useState([]);
  const { currency } = useContext(AuthContext);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentProducts")) || [];
    const unique = Array.from(
      new Map(stored.map((item) => [item.id, item])).values()
    );
    const lastSeven = unique.slice(-7);
    setItems(lastSeven);
  }, []);

  if (!items.length) return null;

  const stopNav = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toProduct = (item) => ({
    id: item.id,
    name: item.name,
    name_ar: item.name_ar || item.name,
    name_ur: item.name_ur || item.name,
    slug: item.slug,
    item_code: item.code,
    price: item.price,
    discount_price: item.discount_price || null,
    stocks: item.stocks ?? 1,
    tax: item.tax || 0,
    images: item.image ? [item.image.replace(ImageURL, "")] : [],
  });

  return (
    <div className="mt-10 px-4 lg:px-20">
      <Typography
        sx={{ fontWeight: "600" }}
        className="text-2xl mb-6 poppins border-b"
      >
        Recently <span className="text-[#2858A3]">Viewed</span>
      </Typography>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
        {items.map((item) => {
          const product = toProduct(item);
          return (
            <div
              key={item.id}
              className="relative group bg-white border rounded-xl p-3 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* ✅ Navigatable area — only clicking this part goes to product page */}
                
                <div className="relative w-full h-60 p-5 flex items-center justify-center mb-3 border-b overflow-hidden">
                  <a className="p-5"
                    href={`/product/${item.slug}`}
                  >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full object-contain"
                    />
                    </a>
                   

                  {/* ✅ AddToCart — stops propagation at div level so <a> never fires */}
                  <div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                    style={{ zIndex: 10, whiteSpace: "nowrap" }}
                    onClick={stopNav}
                    onMouseDown={stopNav}  
                  >
                    <AddToCart
                      product={product}
                      quantity={1}
                      className="poppins text-xs w-38 h-10 flex items-center justify-center bg-[#1E55AC] text-white rounded-full font-semibold shadow-md hover:bg-[#02AFF3] transition-all duration-200"
                    />
                  </div>

                  {/* ✅ AddToWishlist — same pattern */}
                  <div
                    className="absolute top-2 right-2 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out"
                    style={{ zIndex: 10 }}
                    onClick={stopNav}
                    onMouseDown={stopNav}
                  >
                    <div className="bg-white rounded-full shadow">
                      <AddToWishlist
                        product={product}
                        products={[]}
                        setProducts={() => {}}
                        viaCategory={true}
                        open={false}
                        setOpen={() => {}}
                      />
                    </div>
                  </div>
                </div>
           

                <div className="flex flex-col flex-grow">
                  <p className="text-gray-400 text-xs mb-1">{item.code}</p>
                  <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                    {item.name}
                  </p>
                  <p className="text-[#2858A3] font-semibold text-sm mt-auto">
                    {currency} {item.price}
                  </p>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentlyView;