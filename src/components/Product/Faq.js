import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next"; // Import i18next

const Faq = () => {
  const { t } = useTranslation(); // Hook for translations
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqData = [
    {
      question: t("faq_question_1"),
      answer: t("faq_answer_1"),
    },
    {
      question: t("faq_question_2"),
      answer: t("faq_answer_2"),
    },
    {
      question: t("faq_question_3"),
      answer: t("faq_answer_3"),
    },
    {
      question: t("faq_question_4"),
      answer: t("faq_answer_4"),
    },
    {
      question: t("faq_question_5"),
      answer: t("faq_answer_5"),
    },
    {
      question: t("faq_question_6"),
      answer: t("faq_answer_6"),
    },
    {
      question: t("faq_question_7"),
      answer: t("faq_answer_7"),
    },
    {
      question: t("faq_question_8"),
      answer: t("faq_answer_8"),
    },
    {
      question: t("faq_question_9"),
      answer: t("faq_answer_9"),
    },
    {
      question: t("faq_question_10"),
      answer: t("faq_answer_10"),
    },
    {
      question: t("faq_question_11"),
      answer: t("faq_answer_11"),
    },
    {
      question: t("faq_question_12"),
      answer: t("faq_answer_12"),
    },
    {
      question: t("faq_question_13"),
      answer: t("faq_answer_13"),
    },
  ];

  return (
    <Box className="w-full h-fit mt-10 px-4 sm:px-8 lg:px-16">
      <Typography className="poppins text-3xl font-bold text-[#2E2E2E] uppercase py-4 text-center">
        {t("frequently_asked_questions")}
      </Typography>
      {faqData.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          className={`my-3 rounded-lg shadow-none border-none ${
            expanded === `panel${index}`
              ? "bg-[#2858a3] text-white"
              : "bg-[#F5F5F5] text-[#2E2E2E]"
          }`}
          sx={{
            borderTop: 'none',
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon className="bg-white rounded-full h-7 w-7 text-[#2858a3]" />
            }
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography
              sx={{ width: "100%" }}
              className="poppins text-sm sm:text-base"
            >
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="bg-white text-xs sm:text-sm poppins text-[#5D5D5D] py-3 px-5">
            {item.answer}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Faq;