import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ajaxService from "../../../services/ajax-service";
import Dropdown from 'react-multilevel-dropdown';
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Deals from "./Deals";
import { createSlug, getCategoryName } from "../../../utils";

const Categories = () => {
    const { t, i18n } = useTranslation();

    const [categories, setCategories] = useState([]);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [dropdownKey, setDropdownKey] = useState(0);

    const loadCategories = async () => {
        const { success, data } = await ajaxService.get('/all-categories');
        if (success) {
            setCategories(data);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (categoryOpen) {
                setCategoryOpen(false);
                setDropdownKey(prev => prev + 1);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [categoryOpen]);

    const childCategories = (parentSlug, childrens) => (
        childrens.length > 0 && (
            <Dropdown.Submenu position="right" className="border-b-[3px] border-[#2858a3] rounded-b-md bg-[#f1f1f1]" style={{ width: '150%'}}>
                <div className="text-sm uppercase text-[#fff] bg-[#2858a3] pb-1 font-bold text-center border-b-[1px] border-[#2858a3] rounded-b-md -mt-2 mb-2">
                    {t("header_categories.level_two")}
                </div>
                {childrens.map((child, index) => {
                    const childSlug = child.slug || createSlug(child.name);
                    return (
                        <Dropdown.Item key={`child-${index}`} className="flex items-center justify-between gap-x-14">
                            <Link to={`/category/${parentSlug}/${childSlug}`} className= " relative w-full flex items-center justify-between gap-x-8">
                                {getCategoryName(child, i18n.language)}
                                {/* Only show arrow if child has sub-children */}
                                {child.childrens && child.childrens.length > 0 && (
                                <ArrowRightIcon className="text-sm text-[#2858a3] absolute -right-1 " />
                                )}
                            </Link>
                            {child.childrens && child.childrens.length > 0 && subChildCategories(parentSlug, childSlug, child.childrens)}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Submenu>
        )
    );

    const subChildCategories = (parentSlug, childSlug, subChildrens) => (
        subChildrens.length > 0 && (
            <>
                <Dropdown.Submenu position="right" className="border-b-[3px] border-[#2858a3] rounded-b-md bg-[#f1f1f1]" style={{ width: '160%', maxHeight: '320px', overflowY: 'auto', scrollbarWidth: 'thick' }}>
                    <div className="text-sm uppercase text-[#fff] bg-[#2858a3] pb-1 font-bold text-center border-b-[1px] border-[#2858a3] rounded-b-md -mt-2 mb-2" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        {t("header_categories.level_three")}
                    </div>
                    {subChildrens.map((child, index) => {
                        const subChildSlug = child.slug || createSlug(child.name);
                        return (
                            <Dropdown.Item key={`subchild-${index}`} className="flex items-center justify-between gap-x-10">
                                <Link to={`/category/${parentSlug}/${childSlug}/${subChildSlug}`} className="w-full flex items-center justify-between gap-x-14">
                                    {getCategoryName(child, i18n.language)}
                                </Link>
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown.Submenu>
            </>
        )
    );

    return (
        <Dropdown
            key={`${dropdownKey}-${i18n.language}`}
            sx={{
                    fontSize: { md: "0.75rem", lg: "0.875rem", xl: "1rem" },
                  }}
            position="right"
            title={<>{t("header_categories.shop")} {categoryOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</>}
            className="poppins text-md text-white flex items-center relative px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105 group"
            onClick={() => setCategoryOpen(!categoryOpen)}
            menuClassName="border-b-[3px] border-[#2858a3] rounded-b-md bg-[#f1f1f1] text-black h-fit absolute z-50 top-9 left-0 block"
        >
            <Dropdown.Item className="w-full flex items-center justify-between gap-x-14">
                <Link to={`/category`} className="w-full flex items-center justify-between gap-x-14">
                    {t("header_categories.view_all_items")}
                </Link>
            </Dropdown.Item>

            <Dropdown.Item className="w-full flex items-center justify-between gap-x-14">
                <>
                    {t("header_categories.categories")}
                    <ArrowRightIcon className="text-sm text-[#2858a3]" />
                    <Dropdown.Submenu position="right" className="border-b-[3px] border-[#2858a3] rounded-b-md bg-[#f1f1f1]" style={{ width: '100%' }}>
                        <div className="text-sm uppercase text-[#fff] bg-[#2858a3] pb-1 font-bold text-center border-b-[1px] border-[#2858a3] rounded-b-md -mt-2 mb-2">
                            {t("header_categories.level_one")}
                        </div>
                        {categories.map((cat, i) => {
                            const catSlug = cat.slug || createSlug(cat.name);
                            return (
                                <Dropdown.Item key={i} className="w-full flex items-center justify-between gap-x-14 ">
                                    <Link to={`/category/${catSlug}`} className="w-full flex items-center justify-between  gap-x-10">
                                        {getCategoryName(cat, i18n.language)}
                                        {/* Only show arrow if category has children */}
                                        {cat.childrens && cat.childrens.length > 0 && (
                                        <ArrowRightIcon className="text-sm text-[#2858a3] " />
                                        )}
                                    </Link>
                                    {childCategories(catSlug, cat.childrens)}
                                </Dropdown.Item>
                            );
                        })}
                    </Dropdown.Submenu>
                </>
            </Dropdown.Item>

            <Deals key="deals-section" title={t("header_categories.deals")} />
        </Dropdown>
    );
};

export default Categories;
