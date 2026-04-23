import React from "react";
import { Box, Typography } from "@mui/material";

const SpecialInstructions = ({ formData, setFormData, t }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: "4px",
        marginBottom: "12px",
        paddingBottom: "15px",
      }}
      role="presentation"
    >
      <Box
        className="p-5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <p style={{ fontWeight: 900, fontSize: "16px" }}>
          {t('checkout.special_instructions')}
        </p>
      </Box>
      <Box className="w-full h-fit px-5 pb-5">
        <Box className="flex flex-col items-start w-full gap-1">
          <textarea
            id="special_instruction"
            name="special_instruction"
            value={formData.special_instruction || ""}
            onChange={handleChange}
            maxLength={1000}
            rows={4}
            className="text-black bg-white rounded-md w-full text-[14px] outline-none poppins px-3 py-2.5 border border-[#cccccc] resize-y"
            placeholder={t('checkout.enter_special_instructions')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SpecialInstructions;

