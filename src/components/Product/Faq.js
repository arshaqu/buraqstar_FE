import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState(0); // first open

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
    <Box
      sx={{
        maxWidth: "800px", // 👈 center container like image
        margin: "0 auto",
        px: 2,
        py: 6,
      }}
    >
      {/* TITLE */}
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: { xs: "22px", md: "28px" },
          mb: 4,
        }}
      >
       {t("frequently_asked_questions")}
      </Typography>

      {faqData.map((item, index) => {
        const isOpen = expanded === index;

        return (
          <Accordion
            key={index}
            expanded={isOpen}
            onChange={handleChange(index)}
            sx={{
              boxShadow: "none",
              background: "transparent",
              borderBottom: "1px solid #e5e7eb", // 👈 always single divider
              "&:before": { display: "none" },
            }}
          >
            {/* QUESTION */}
            <AccordionSummary
            
              expandIcon={
                <ExpandMoreIcon
                className="poppins"
                  sx={{
                    color: "#6b7280",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "0.3s",
                  }}
                />
              }
              sx={{
                px: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "12px", md: "16px" },
                  fontWeight: isOpen ? 600 : 400,
                  color: "#111827",
                   fontFamily: "'Poppins', sans-serif", // 👈 add here
                }}
              >
                {item.question}
              </Typography>
            </AccordionSummary>

            {/* ANSWER */}
            <AccordionDetails
              sx={{
                px: 0,
                pb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "10px", md: "13px" },
                  color: "#6b7280",
                  mb: 2,
                  lineHeight: 1.6,
                   fontFamily: "'Poppins', sans-serif", // 👈 add here
                }}
              >
                {item.answer}
              </Typography>

              {/* OPTIONAL BUTTON */}
              {item.button && (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderColor: "#cbd5e1",
                    color: "#111827",
                    borderRadius: "6px",
                  }}
                >
                  Shop Now
                </Button>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default Faq;