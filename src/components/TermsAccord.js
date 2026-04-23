import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TermsAccord = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const terms = [
    {
      title: "Supplier. Each product in your order is sold by us.",
      points: [
        "Order Acceptance. Our acceptance of your order will take place when we notify you of our acceptance in writing (e.g. by email). If we are unable to accept your order, we will inform you of this in writing or through a call and will not charge you for the product.",
        "Payment. By placing an order, you authorize us or our third-party payment processer to process your credit/debit card details for the amount of your order. We accept payment by, credit/debit card cash on delivery",
        "We may remove or add cards or other payment methods that we accept at any time without prior notice to you.",
        "Cancelling Order. You may cancel your order immediately prior to shipping for any reason.",
        "Our Cancellation. We may cancel your order(s) if you do not make any payment to us when it is due",
        "you do not, within a reasonable time of us asking for it, provide us with information that is necessary for us to provide the products; or",
        "you do not, within a reasonable time, allow us to deliver the products to you or collect them from us; or",
        "you attempt to bulk or multi-order purchase.",
        "order(s) not being capable of fulfilled due to product(s) not being available.",
        "Bulk/Multiple Purchasing. We reserve the right to reject any orders, at our sole discretion, where we detect bulk purchasing or multiple units of similar products being purchased.",
      ],
    },
    {
      title: "Delivery of your order",
      points: [
        "Order Acceptance. Our acceptance of your order will take place when we notify you of our acceptance in writing (e.g. by email). If we are unable to accept your order, we will inform you of this in writing or through a call and will not charge you for the product.",
        "Payment. By placing an order, you authorize us or our third-party payment processer to process your credit/debit card details for the amount of your order. We accept payment by, credit/debit card cash on delivery",
        "We may remove or add cards or other payment methods that we accept at any time without prior notice to you.",
        "Cancelling Order. You may cancel your order immediately prior to shipping for any reason.",
        "Our Cancellation. We may cancel your order(s) if you do not make any payment to us when it is due",
        "you do not, within a reasonable time of us asking for it, provide us with information that is necessary for us to provide the products; or",
        "you do not, within a reasonable time, allow us to deliver the products to you or collect them from us; or",
        "you attempt to bulk or multi-order purchase.",
        "order(s) not being capable of fulfilled due to product(s) not being available.",
        "Bulk/Multiple Purchasing. We reserve the right to reject any orders, at our sole discretion, where we detect bulk purchasing or multiple units of similar products being purchased.",
      ],
    },
    {
      title: "Refund Procedure",
      points: [
        "Order Acceptance. Our acceptance of your order will take place when we notify you of our acceptance in writing (e.g. by email). If we are unable to accept your order, we will inform you of this in writing or through a call and will not charge you for the product.",
        "Payment. By placing an order, you authorize us or our third-party payment processer to process your credit/debit card details for the amount of your order. We accept payment by, credit/debit card cash on delivery",
        "We may remove or add cards or other payment methods that we accept at any time without prior notice to you.",
        "Cancelling Order. You may cancel your order immediately prior to shipping for any reason.",
        "Our Cancellation. We may cancel your order(s) if you do not make any payment to us when it is due",
        "you do not, within a reasonable time of us asking for it, provide us with information that is necessary for us to provide the products; or",
        "you do not, within a reasonable time, allow us to deliver the products to you or collect them from us; or",
        "you attempt to bulk or multi-order purchase.",
        "order(s) not being capable of fulfilled due to product(s) not being available.",
        "Bulk/Multiple Purchasing. We reserve the right to reject any orders, at our sole discretion, where we detect bulk purchasing or multiple units of similar products being purchased.",
      ],
    },
  ];
  return (
    <Box className="w-full h-fit py-10 px-16">
      <Typography className="poppins text-3xl font-bold w-3/4 text-[#2E2E2E] uppercase py-2">
        Order Acceptance
      </Typography>
      {terms.map((term, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          className={`my-3 rounded-lg shadow-none border-none ${expanded === `panel${index}` ? "bg-[#02ADEC] text-white" : "bg-[#F5F5F5] text-[#2E2E2E]"}`}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon className="bg-white rounded-full h-7 w-7 text-[#02ADEC]" />
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "100%" }} className="nunito text-base font-semibold sm:text-xl">
              {term.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="bg-white text-sm nunito text-[#152E3A] py-3 px-5">
            <ol>
              {term.points.map((point, i) => (
                <li className="nunito py-1" key={i}>
                  {i + 1}. {point}
                </li>
              ))}
            </ol>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default TermsAccord;
