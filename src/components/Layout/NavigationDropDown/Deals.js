import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-multilevel-dropdown';
import ajaxService from "../../../services/ajax-service";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useTranslation } from "react-i18next";
import { createSlug, getCategoryName } from "../../../utils";

const Deals = ({ title }) => {

    const { i18n } = useTranslation()
    const [dealsOpen, setDealsOpen] = useState(false);
    const [deals, setDeals] = useState([])

    const loadDeals = async () => {
        const { success, data } = await ajaxService.get('/all-deals');
        if (success) {
            setDeals(data);
        }
    }

    useEffect(() => {
        loadDeals();
    }, [])

    return (
        <>
            {deals
                .filter(deal => deal.name.toUpperCase() !== "ON LINE")
                .map((deal, i) => {
                    const dealSlug = deal.slug || createSlug(deal.name);
                    return (
                        <Dropdown.Item key={i} className={`w-full flex items-center justify-between gap-x-14`}>
                            <Link
                                to={`/deals/${dealSlug}`}
                                className={`w-full flex items-center justify-between gap-x-14`}
                            >
                                {getCategoryName(deal, i18n.language)}
                            </Link>
                        </Dropdown.Item>
                    );
                })
            }
        </>
    )
}

export default Deals


{/* <Dropdown
position="right"
title={<>{title} {dealsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</>}
className="poppins text-sm text-[#2858a3] flex items-center relative"
onClick={() => setDealsOpen(!dealsOpen)}
menuClassName="border-b-[3px] border-[#2858a3] rounded-b-md bg-[#f1f1f1] text-black h-fit absolute z-50 top-9 left-0 block"
>
{deals.map((val, i) => (
    <Dropdown.Item key={i} className={`w-full flex items-center justify-between gap-x-14`}>
        <Link
            to={`/deals?type=${val.slug}`}
            className={`w-full flex items-center justify-between gap-x-14`}
        >
            {val.name}
        </Link>
    </Dropdown.Item>
))}
</Dropdown> */}