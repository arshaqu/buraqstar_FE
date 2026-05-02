import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-multilevel-dropdown';
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ajaxService from "../../../services/ajax-service";
import { useTranslation } from "react-i18next"; // Import i18next
import { createSlug } from "../../../utils";

const Brands = () => {
    const { t, i18n } = useTranslation();

    const [brandOpen, setBrandOpen] = useState(false);
    const [brands, setBrands] = useState([])
    const [dropdownKey, setDropdownKey] = useState(0);

    const loadBrands = async () => {
        const { success, data } = await ajaxService.get('/all-brands');
        if (success) {
            setBrands(data);
        }
    }

    useEffect(() => {
        loadBrands();
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (brandOpen) {
                setBrandOpen(false);
                setDropdownKey(prev => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [brandOpen])

    return (
        <Dropdown
            key={`${dropdownKey}-${i18n.language}`}
            position="right"
            title={<>{t("navigation.brands")} {brandOpen ? <ArrowDropUpIcon  /> : <ArrowDropDownIcon/>}</>}
            className="poppins text-md text-white flex items-center relative px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105 group"
            onClick={() => setBrandOpen(!brandOpen)}
            menuClassName="border-b-[3px] border-[#2858a3] rounded-b-md bg-[#f1f1f1] text-black h-fit absolute z-50 top-9 left-0 block"
        >
            {brands.map((brand, i) => {
                const brandSlug = brand.slug || createSlug(brand.name);
                return (
                    <Dropdown.Item key={i} className={`w-full flex items-center justify-between gap-x-14`}>
                        <Link
                            to={`/brand/${brandSlug}`}
                            className={`w-full flex items-center justify-between gap-x-14`}
                        >
                            {t(`brands.${brand.name}`, brand.name)}
                        </Link>
                    </Dropdown.Item>
                );
            })}
        </Dropdown>
    )
}

export default Brands;