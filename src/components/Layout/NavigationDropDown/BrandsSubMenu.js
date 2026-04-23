import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-multilevel-dropdown';
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ajaxService from "../../../services/ajax-service";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { createSlug } from "../../../utils";

const BrandSubMenu = ({ title }) => {

    const [brandOpen, setBrandOpen] = useState(false);
    const [brands, setBrands] = useState([])

    const loadBrands = async () => {
        const { success, data } = await ajaxService.get('/all-brands');
        if (success) {
            setBrands(data);
        }
    }

    useEffect(() => {
        loadBrands();
    }, [])

    return (
        <>
            {title}
            <ArrowRightIcon className="text-sm text-[#2858a3]" />

            <Dropdown.Submenu position="right" className={'border-b-[3px] border-[#2858a3] rounded-b-md bg-[#f1f1f1]'} style={{ width: '107%' }}>
                {brands.map((brand, i) => {
                    const brandSlug = brand.slug || createSlug(brand.name);
                    return (
                        <Dropdown.Item key={i} className={`w-full flex items-center justify-between gap-x-14`}>
                            <Link
                                to={`/brand/${brandSlug}`}
                                className={`w-full flex items-center justify-between gap-x-14`}
                            >
                                {brand.name}
                            </Link>
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Submenu>
        </>
    )
}

export default BrandSubMenu



{/* <Dropdown
position="right"
title={<>{title} {brandOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</>}
className="poppins text-sm text-white flex items-center relative"
onClick={() => setBrandOpen(!brandOpen)}
menuClassName="border-b-[3px] border-[#2858a3] rounded-b-md bg-[#f1f1f1] text-black h-fit absolute z-50 top-9 left-0 block"
>
{brands.map((brand, i) => (
    <Dropdown.Item key={i} className={`w-full flex items-center justify-between gap-x-14`}>
        <Link
            to={`/brand?brand_id=${brand.id}`}
            className={`w-full flex items-center justify-between gap-x-14`}
        >
            {brand.name}
        </Link>
    </Dropdown.Item>
))}
</Dropdown> */}