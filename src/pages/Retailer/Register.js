import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Divider,
  Box,
  Alert,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { CloudUpload, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ajaxService from "../../services/ajax-service";
import { useTranslation } from "react-i18next"; // Import i18next
import SEO from "../../components/SEO";
import { SITE_URL } from "../../constants";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
  GetCountries,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const RETAILER_ERROR_FIELD_ORDER = [
  "business_name",
  "business_type",
  "other_business_type",
  "registration_number",
  "country",
  "city",
  "address",
  "website",
  "contact_person_name",
  "position",
  "phone",
  "email",
  "products",
  "target_market",
  "years_in_business",
  "tax_number",
  "business_certificate",
  "trading_license_certificate",
  "chamber_of_commerce_certificate",
  "sponsor_passport_copy",
  "sponsor_eid_copy",
  "manager_passport_copy",
  "manager_visa_copy",
  "manager_eid_copy",
  "tenancy_contract_copy",
  "terms_accepted",
];

const scrollToFirstRetailerError = (errorKeys) => {
  const keys = new Set(errorKeys);
  requestAnimationFrame(() => {
    for (const field of RETAILER_ERROR_FIELD_ORDER) {
      if (!keys.has(field)) continue;
      const node = document.querySelector(`[data-retailer-field="${field}"]`);
      if (node) {
        node.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      }
    }
  });
};

const RegisterSectionHeading = ({ children, first }) => (
  <Box
    sx={{
      mb: 2.5,
      mt: first ? 0 : 4,
      pb: 1.25,
      borderBottom: 2,
      borderColor: "primary.main",
    }}
  >
    <Typography variant="h6" fontWeight={800} color="primary" className="poppins">
      {children}
    </Typography>
  </Box>
);

const RetailerRegistration = () => {
  // const navigate = useNavigate();
  const theme = useTheme();
  const { t, i18n } = useTranslation(); // Hook for translations

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    business_name: "",
    business_type: "",
    other_business_type: "",
    registration_number: "",
    country: "",
    city: "",
    address: "",
    website: "",
    contact_person_name: "",
    position: "",
    email: "",
    phone: "",
    products: "",
    target_market: "",
    years_in_business: "",
    tax_number: "",
    terms_accepted: false,
    documents: {
      business_certificate: null,
      tax_certificate: null,
      other_documents: null,
      trading_license_certificate: null,
      chamber_of_commerce_certificate: null,
      sponsor_passport_copy: null,
      sponsor_eid_copy: null,
      manager_passport_copy: null,
      manager_visa_copy: null,
      manager_eid_copy: null,
      tenancy_contract_copy: null,
    },
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [defaultCountry, setDefaultCountry] = useState(null);
  const latestPhoneRef = useRef("");

  useEffect(() => {
    let cancelled = false;
    GetCountries().then((countries) => {
      if (cancelled || !countries?.length) return;
      const uae =
        countries.find((c) => c.name === "United Arab Emirates") ||
        countries.find((c) => /united arab emirates/i.test(String(c.name)));
      if (!uae) return;
      setDefaultCountry(uae);
      setCountryId(uae.id);
      setFormData((prev) => {
        if (prev.country) return prev;
        return { ...prev, country: uae.name };
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Validate phone number
  const validatePhoneNumber = (phoneValue) => {
    if (!phoneValue || !phoneValue.trim()) {
      return t('phone_required');
    }

    // Remove all non-digit characters except + for validation
    const phoneDigitsOnly = phoneValue.toString().replace(/\D/g, '');

    // Extract country code length
    let countryCodeLength = 0;
    if (phoneDigitsOnly.startsWith('971')) {
      countryCodeLength = 3; // UAE
    } else if (phoneDigitsOnly.startsWith('1')) {
      countryCodeLength = 1; // US/Canada
    } else if (phoneDigitsOnly.startsWith('44') || phoneDigitsOnly.startsWith('91') ||
      phoneDigitsOnly.startsWith('86') || phoneDigitsOnly.startsWith('81') ||
      phoneDigitsOnly.startsWith('49') || phoneDigitsOnly.startsWith('33')) {
      countryCodeLength = 2; // UK, India, China, Japan, Germany, France
    } else if (phoneDigitsOnly.startsWith('7')) {
      countryCodeLength = 1; // Russia
    } else {
      // Default: try to detect based on length
      if (phoneDigitsOnly.length > 12) {
        countryCodeLength = 3;
      } else if (phoneDigitsOnly.length > 10) {
        countryCodeLength = 2;
      } else {
        countryCodeLength = 1;
      }
    }

    const phoneNumberOnly = phoneDigitsOnly.substring(countryCodeLength);
    const phoneLength = phoneNumberOnly.length;

    // Validate phone number length (8-12 digits excluding country code)
    if (phoneLength < 8 || phoneLength > 12) {
      return t("invalid_phone_format") || "Please enter a valid phone number (8-12 digits)";
    }

    return null; // No error
  };

  const normalizeWebsiteForSubmit = (raw) => {
    const s = String(raw || "").trim();
    if (!s) return "";
    if (/^https?:\/\//i.test(s)) return s;
    if (/^\/\//.test(s)) return `https:${s}`;
    if (/^[\w.-]+\.[a-z]{2,}(\/|\?|#|$)/i.test(s)) {
      return `https://${s.replace(/^\/+/, "")}`;
    }
    return s;
  };

  const validateWebsiteSocial = (raw) => {
    const s = String(raw || "").trim();
    if (!s) return null;
    const candidate = normalizeWebsiteForSubmit(s);
    try {
      const u = new URL(candidate);
      if (u.protocol !== "http:" && u.protocol !== "https:") {
        return t("website_social_invalid");
      }
      return null;
    } catch {
      return t("website_social_invalid");
    }
  };

  const humanizeServerValidationMessage = (msg) => {
    if (msg == null) return "";
    const s = String(msg).trim();
    if (!s) return "";
    const lower = s.toLowerCase();
    if (
      lower === "validation.url" ||
      lower.endsWith(".url") ||
      lower.includes("validation.url") ||
      lower.includes("must be a valid url") ||
      (lower.includes("url") && lower.includes("valid"))
    ) {
      return t("website_social_invalid");
    }
    if (
      lower === "validation.email" ||
      lower.includes("validation.email") ||
      (lower.includes("email") && lower.includes("valid"))
    ) {
      return t("invalid_email_format");
    }
    if (lower === "validation.required" || lower.includes("validation.required") || lower === "required") {
      return t("registration_field_required");
    }
    return s;
  };

  const mapServerErrorsToForm = (errorsObj) => {
    const mapped = {};
    if (!errorsObj || typeof errorsObj !== "object") return mapped;
    Object.entries(errorsObj).forEach(([key, val]) => {
      const first = Array.isArray(val) ? val[0] : val;
      mapped[key] = humanizeServerValidationMessage(first);
    });
    return mapped;
  };

  const handlePhoneChange = (value) => {
    setFormError("");
    const normalized =
      value && !String(value).startsWith("+") ? `+${value}` : value || "";
    latestPhoneRef.current = normalized;
    setFormData((prev) => ({ ...prev, phone: normalized }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const handlePhoneBlur = () => {
    const phoneError = validatePhoneNumber(latestPhoneRef.current);
    setErrors((prev) => ({
      ...prev,
      phone: phoneError || "",
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === undefined || name === "") return;
    setFormError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCountrySelect = (e) => {
    setFormError("");
    setCountryId(e.id);
    setStateId(0);
    setFormData((prev) => ({ ...prev, country: e.name, city: "" }));
    setErrors((prev) => ({ ...prev, country: "", city: "" }));
  };

  const handleStateSelect = (e) => {
    setFormError("");
    setStateId(e.id);
    setFormData((prev) => ({ ...prev, city: "" }));
    setErrors((prev) => ({ ...prev, city: "" }));
  };

  const handleCitySelect = (e) => {
    setFormError("");
    setFormData((prev) => ({ ...prev, city: e.name }));
    setErrors((prev) => ({ ...prev, city: "" }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (!name) return;
    setFormError("");
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: files[0],
      },
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleFileRemove = (name) => {
    setFormError("");
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: null,
      },
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const newErrors = {};

    // Validation
    if (!formData.business_name.trim()) newErrors.business_name = t("business_name_required");
    if (!formData.business_type.trim()) {
      newErrors.business_type = t("business_type_required");
    } else if (formData.business_type === "Other" && !formData.other_business_type.trim()) {
      newErrors.other_business_type = t("specify_business_type");
    }
    if (!formData.registration_number.trim())
      newErrors.registration_number = t("registration_number_required");
    if (!formData.country.trim()) newErrors.country = t("country_required")
    if (!formData.city.trim()) newErrors.city = t("city_required");
    if (!formData.address.trim()) newErrors.address = t("address_required");
    const websiteFieldError = validateWebsiteSocial(formData.website);
    if (websiteFieldError) newErrors.website = websiteFieldError;
    if (!formData.contact_person_name.trim())
      newErrors.contact_person_name = t("contact_person_name_required");
    if (!formData.position.trim()) newErrors.position = t('position_required');
    if (!formData.email.trim()) newErrors.email = t('email_required');

    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t("invalid_email_format");
    if (!formData.phone.trim()) {
      newErrors.phone = t('phone_required');
    } else {
      const phoneValidationError = validatePhoneNumber(formData.phone);
      if (phoneValidationError) {
        newErrors.phone = phoneValidationError;
      }
    }

    if (!formData.products.trim()) newErrors.products = t("products_services_required");
    if (!formData.years_in_business.trim()) newErrors.years_in_business = t("years_in_business_required");
    if (!formData.terms_accepted)
      newErrors.terms_accepted = t("accept_terms_conditions");
    if (!formData.documents.business_certificate)
      newErrors.business_certificate = t("business_certificate_required");
    if (!formData.documents.trading_license_certificate)
      newErrors.trading_license_certificate = t('trading_license_certificate_required');
    if (!formData.documents.chamber_of_commerce_certificate)
      newErrors.chamber_of_commerce_certificate = t('chamber_of_commerce_certificate_required');
    if (!formData.documents.sponsor_passport_copy)
      newErrors.sponsor_passport_copy = t("sponsor_passport_copy_required");
    if (!formData.documents.sponsor_eid_copy)
      newErrors.sponsor_eid_copy = t("sponsor_eid_copy_required");
    if (!formData.documents.manager_passport_copy)
      newErrors.manager_passport_copy = t('manager_passport_copy_required');
    if (!formData.documents.manager_visa_copy)
      newErrors.manager_visa_copy = t("manager_visa_copy_required");
    if (!formData.documents.manager_eid_copy)
      newErrors.manager_eid_copy = t("manager_eid_copy_required");
    if (!formData.documents.tenancy_contract_copy)
      newErrors.tenancy_contract_copy = t('tenancy_contract_copy_required');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      scrollToFirstRetailerError(Object.keys(newErrors));
      return;
    }

    // Form Submission Logic
    setLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "documents") {
        Object.keys(formData.documents).forEach((docKey) => {
          if (formData.documents[docKey]) {
            formDataToSend.append(docKey, formData.documents[docKey]);
          }
        });
      } else if (key === "phone") {
        // Format phone: ensure it starts with + if it doesn't already
        const formattedPhone = formData.phone.trim().startsWith('+') ? formData.phone.trim() : `+${formData.phone.trim()}`;
        formDataToSend.append(key, formattedPhone);
      } else if (key === "website") {
        formDataToSend.append(key, normalizeWebsiteForSubmit(formData.website));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    if (formData.business_type === "Other") {
      formDataToSend.append("business_type", formData.other_business_type);
    }

    try {
      const response = await ajaxService.post("/retailer", formDataToSend);
      setLoading(false);

      if (!response) {
        setFormError(t("registration_server_error"));
        requestAnimationFrame(() => {
          document.querySelector("[data-retailer-form-alert]")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }

      if (response.success) {
        setFormError("");
        setErrors({});
        setSuccess(true);
        return;
      }

      const serverPayloadErrors = response.errors || response.data?.errors;
      const serverMapped = mapServerErrorsToForm(serverPayloadErrors);
      if (Object.keys(serverMapped).length > 0) {
        setErrors((prev) => ({ ...prev, ...serverMapped }));
        scrollToFirstRetailerError(Object.keys(serverMapped));
        return;
      }

      const rawMsg = response?.message;
      const friendly = humanizeServerValidationMessage(rawMsg);
      setFormError(friendly || t("registration_server_error"));
      requestAnimationFrame(() => {
        document.querySelector("[data-retailer-form-alert]")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (error) {
      console.error("Error during registration:", error);
      setLoading(false);
      setFormError(t("registration_server_error"));
    }
  };

  return (
    !success ?
      <Box sx={{ bgcolor: "grey.50", width: "100%", minHeight: "100%", pb: { xs: 4, md: 6 } }}>
        <>
        <SEO
          title="Partner With Us | Buraq Star Trading | Novex | Cavil | Zilco"
          description="Explore partnership opportunities with Buraq Star Trading. Collaborate with us to grow your business and offer premium products to customers."
          keywords="retailer registration, partner with us, become a partner, Buraq retailer, wholesale electrical, hardware distributor, UAE retail partnership"
          url="/retailer/registration"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Retailer Registration",
            "url": `${SITE_URL}/retailer/registration`,
            "description": "Apply to become a retail partner with Buraq for electrical and hardware products in the UAE.",
            "potentialAction": {
              "@type": "SubmitAction",
              "name": "Retailer Registration",
              "target": `${SITE_URL}/retailer/registration`
            },
            "publisher": {
              "@type": "Organization",
              "name": "Buraq"
            }
          }}
        />

        <Grid item xs={12} md={10} lg={9} sx={{ mx: "auto" }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.12),
              boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
              mx: { xs: 2, sm: 6, md: 10 },
              my: 3,
              p: { xs: 2, sm: 3 },
              bgcolor: "background.paper",
              transition: "box-shadow 0.2s ease",
              "&:hover": {
                boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.12)}`,
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 }, "&:last-child": { pb: { xs: 2, sm: 3 } } }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography variant="h5" fontWeight={900} color="primary" className="poppins">
                  🤝 {t("partner_with_us")}
                </Typography>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                {t("expand_your_business")}
              </Typography>

              <Box component="ul" sx={{ m: 0, pl: 0, listStyle: "none" }}>
                {[
                  t("power_hand_tools"),
                  t("switch_sockets"),
                  t("wire_cables"),
                  t("hardware"),
                  t("fan_ventilation_systems"),
                  t("water_pumps_pressure_kits"),
                  t("sanitary_bath_fittings"),
                  t("led_lamps_light_fittings"),
                ].map((item, index) => (
                  <Box component="li" key={index} sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.25 }}>
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body1" color="text.primary" fontWeight={500}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography variant="subtitle1" fontWeight={700} color="primary" sx={{ mt: 3, mb: 1.5 }} className="poppins">
                {t("why_partner_with_us")}
              </Typography>

              <Box component="ul" sx={{ m: 0, pl: 0, listStyle: "none" }}>
                {[
                  t("access_premium_brands"),
                  t("reliable_supply_chain"),
                  t("competitive_pricing"),
                  t("join_growing_network"),
                ].map((reason, index) => (
                  <Box component="li" key={index} sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.25 }}>
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: alpha(theme.palette.primary.main, 0.45),
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body1" color="text.primary" fontWeight={500}>
                      {reason}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          container
          justifyContent="center"
          sx={{ px: { xs: 2, sm: 3 }, pt: 1, pb: 2 }}
          className="poppins"
          dir={isRTL ? "rtl" : "ltr"}
          style={{ direction: isRTL ? "rtl" : "ltr" }}
        >
          <Card
            elevation={0}
            sx={{
              maxWidth: 900,
              width: "100%",
              borderRadius: 3,
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
              boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.06)}`,
              bgcolor: "background.paper",
              overflow: "hidden",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 2.5, sm: 4 },
                "&:last-child": { pb: { xs: 2.5, sm: 4 } },
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="overline"
                  sx={{ color: "text.secondary", letterSpacing: 1, fontWeight: 600, display: "block" }}
                >
                  {t("welcome_to")}
                </Typography>
                <Typography variant="h4" className="poppins" fontWeight={900} color="primary" sx={{ lineHeight: 1.2 }}>
                  BURAQ STAR
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500, mt: 0.5 }}>
                  {t("retailer_registration_form")}
                </Typography>
              </Box>
              <Divider sx={{ my: 3, borderColor: alpha(theme.palette.primary.main, 0.12) }} />

              <form onSubmit={handleSubmit}>
                {formError ? (
                  <Alert
                    data-retailer-form-alert
                    severity="error"
                    sx={{ mb: 2.5, borderRadius: 2 }}
                    onClose={() => setFormError("")}
                  >
                    {formError}
                  </Alert>
                ) : null}
                {/* Section 1: Business Information */}
                <RegisterSectionHeading first>{t("business_information")}</RegisterSectionHeading>
                <Grid container spacing={2}>
                  <Grid item xs={12} data-retailer-field="business_name">
                    <TextField
                      fullWidth
                      label={t("business_name")}
                      name="business_name"
                      placeholder={t("enter_business_name")}
                      value={formData.business_name}
                      onChange={handleInputChange}
                      error={!!errors.business_name}
                      helperText={errors.business_name}
                    />
                  </Grid>
                  <Grid item xs={12} data-retailer-field="business_type">
                    <FormControl fullWidth error={!!errors.business_type} variant="outlined">
                      <InputLabel>{t("business_type")}</InputLabel>
                      <Select
                        name="business_type"
                        value={formData.business_type}
                        onChange={(e) => {
                          const { value } = e.target;
                          setFormError("");
                          setFormData((prev) => ({
                            ...prev,
                            business_type: value,
                          }));
                          setErrors((prev) => ({
                            ...prev,
                            business_type: "",
                          }));
                        }}
                        label={t("business_type")}
                      >

                        <MenuItem value="Manufacturer">{t("manufacturer")}</MenuItem>
                        <MenuItem value="Wholesaler">{t("wholesaler")}</MenuItem>
                        <MenuItem value="Distributor">{t("distributor")}</MenuItem>
                        <MenuItem value="Retailer">{t("retailer")}</MenuItem>
                        <MenuItem value="Other">{t("other_specify")}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* If "Other" is selected, render a text field */}
                  {formData.business_type === "Other" && (
                    <Grid item xs={12} data-retailer-field="other_business_type">
                      <TextField
                        fullWidth
                        label={t("specify_business_type")}
                        name="other_business_type"
                        placeholder={t("enter_business_type")}
                        value={formData.other_business_type || ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          setFormError("");
                          setFormData((prev) => ({
                            ...prev,
                            other_business_type: value,
                          }));
                          setErrors((prev) => ({
                            ...prev,
                            other_business_type: "",
                          }));
                        }}
                        error={!!errors.other_business_type}
                        helperText={errors.other_business_type}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} data-retailer-field="registration_number">
                    <TextField
                      fullWidth
                      label={t("registration_number")}
                      name="registration_number"
                      placeholder={t("enter_registration_number")}
                      value={formData.registration_number}
                      onChange={handleInputChange}
                      error={!!errors.registration_number}
                      helperText={errors.registration_number}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} data-retailer-field="country">
                    <Typography
                      component="label"
                      variant="body2"
                      sx={{ display: "block", mb: 0.75, color: "text.secondary", fontWeight: 600, fontSize: "0.8125rem" }}
                    >
                      {t("country")}
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        "& .stdropdown-input.stsearch-box input": {
                          width: "100%",
                          height: "56px",
                          boxSizing: "border-box",
                          padding: "16.5px 14px",
                          fontSize: "1rem",
                          fontFamily: `${theme.typography.fontFamily}`,
                          border: "1px solid",
                          borderColor: errors.country ? "error.main" : "divider",
                          borderRadius: Number(theme.shape.borderRadius),
                        },
                      }}
                    >
                      <CountrySelect
                        defaultValue={defaultCountry || undefined}
                        onChange={handleCountrySelect}
                        placeHolder={t("delivery_address.select_country")}
                        inputClassName="poppins"
                        containerClassName="w-full"
                      />
                    </Box>
                    {errors.country && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75, display: "block" }}>
                        {errors.country}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      component="label"
                      variant="body2"
                      sx={{ display: "block", mb: 0.75, color: "text.secondary", fontWeight: 600, fontSize: "0.8125rem" }}
                    >
                      {t("delivery_address.state")}
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        "& .stdropdown-input.stsearch-box input": {
                          width: "100%",
                          height: "56px",
                          boxSizing: "border-box",
                          padding: "16.5px 14px",
                          fontSize: "1rem",
                          fontFamily: `${theme.typography.fontFamily}`,
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: Number(theme.shape.borderRadius),
                        },
                      }}
                    >
                      <StateSelect
                        countryid={countryId}
                        onChange={handleStateSelect}
                        placeHolder={t("delivery_address.select_state")}
                        inputClassName="poppins"
                        containerClassName="w-full"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} data-retailer-field="city">
                    <Typography
                      component="label"
                      variant="body2"
                      sx={{ display: "block", mb: 0.75, color: "text.secondary", fontWeight: 600, fontSize: "0.8125rem" }}
                    >
                      {t("city")}
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        "& .stdropdown-input.stsearch-box input": {
                          width: "100%",
                          height: "56px",
                          boxSizing: "border-box",
                          padding: "16.5px 14px",
                          fontSize: "1rem",
                          fontFamily: `${theme.typography.fontFamily}`,
                          border: "1px solid",
                          borderColor: errors.city ? "error.main" : "divider",
                          borderRadius: Number(theme.shape.borderRadius),
                        },
                      }}
                    >
                      <CitySelect
                        countryid={countryId}
                        stateid={stateId}
                        onChange={handleCitySelect}
                        placeHolder={t("delivery_address.select_city")}
                        inputClassName="poppins"
                        containerClassName="w-full"
                      />
                    </Box>
                    {errors.city && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75, display: "block" }}>
                        {errors.city}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} data-retailer-field="address">
                    <TextField
                      fullWidth
                      label={t("address")}
                      name="address"
                      placeholder={t("enter_address")}
                      multiline
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      error={!!errors.address}
                      helperText={errors.address}
                    />
                  </Grid>
                  <Grid item xs={12} data-retailer-field="website">
                    <TextField
                      fullWidth
                      label={t("website_social_media")}
                      name="website"
                      placeholder="https://"
                      value={formData.website}
                      onChange={handleInputChange}
                      error={!!errors.website}
                      helperText={errors.website || t("website_field_hint")}
                      FormHelperTextProps={{
                        error: !!errors.website,
                        sx: !errors.website ? { color: "text.secondary" } : undefined,
                      }}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ my: 3, borderColor: alpha(theme.palette.primary.main, 0.12) }} />

                {/* Section 2: Contact Information */}
                <RegisterSectionHeading>{t("cont_info")}</RegisterSectionHeading>
                <Grid container spacing={2}>
                  <Grid item xs={12} data-retailer-field="contact_person_name">
                    <TextField
                      fullWidth
                      label={t("contact_person_name")}
                      name="contact_person_name"
                      value={formData.contact_person_name}
                      onChange={handleInputChange}
                      error={!!errors.contact_person_name}
                      helperText={errors.contact_person_name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} data-retailer-field="position">
                    <TextField
                      fullWidth
                      label={t("position_title")}
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      error={!!errors.position}
                      helperText={errors.position}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} data-retailer-field="phone">
                    
                    <Box
                      sx={{
                        width: "100%",
                        direction: "ltr",
                        "& .react-tel-input .form-control": {
                          width: "100%",
                          height: "56px",
                          fontSize: "1rem",
                          fontFamily: `${theme.typography.fontFamily}`,
                          borderRadius: `${Number(theme.shape.borderRadius)}px`,
                          border: errors.phone
                            ? `1px solid ${theme.palette.error.main} !important`
                            : `1px solid ${theme.palette.divider}`,
                        },
                        "& .react-tel-input .flag-dropdown": {
                          borderRadius: `${Number(theme.shape.borderRadius)}px 0 0 ${Number(theme.shape.borderRadius)}px`,
                          borderColor: errors.phone ? theme.palette.error.main : theme.palette.divider,
                          backgroundColor: theme.palette.background.paper,
                        },
                      }}
                    >
                      <ReactPhoneInput
                        country="ae"
                        preferredCountries={["ae", "sa", "pk", "in", "gb", "us"]}
                        value={
                          formData.phone
                            ? formData.phone.startsWith("+")
                              ? formData.phone.slice(1)
                              : formData.phone
                            : ""
                        }
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                        inputClass="poppins"
                        buttonClass="poppins"
                        containerClass={errors.phone ? "phone-input-error" : ""}
                        inputProps={{
                          name: "phone",
                          "aria-label": t("phone_number"),
                        }}
                      />
                    </Box>
                    {errors.phone && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75, display: "block" }}>
                        {errors.phone}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} data-retailer-field="email">
                    <TextField
                      fullWidth
                      label={t("email_address")}

                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ my: 3, borderColor: alpha(theme.palette.primary.main, 0.12) }} />

                {/* Section 3: Business Details */}
                <RegisterSectionHeading>{t("business_details")}</RegisterSectionHeading>
                <Grid container spacing={2}>
                  <Grid item xs={12} data-retailer-field="products">
                    <TextField
                      fullWidth
                      label={t("products_services_offered")}
                      name="products"
                      placeholder={t("list_products_services")}
                      multiline
                      rows={3}
                      value={formData.products}
                      onChange={handleInputChange}
                      error={!!errors.products}
                      helperText={errors.products}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} data-retailer-field="target_market">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>{t("target_market")}</InputLabel>

                      <Select
                        name="target_market"
                        value={formData.target_market}
                        onChange={handleInputChange}
                        label={t("target_market")}
                      >

                        <MenuItem value="B2B">{t("b2b")}</MenuItem>
                        <MenuItem value="B2C">{t("b2c")}</MenuItem>
                        <MenuItem value="Both">{t("both")}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} data-retailer-field="years_in_business">
                    <TextField
                      fullWidth
                      label={t("years_in_business")}
                      name="years_in_business"
                      type="number"
                      value={formData.years_in_business}
                      onChange={handleInputChange}
                      error={!!errors.years_in_business}
                      helperText={errors.years_in_business}
                    />
                  </Grid>
                  <Grid item xs={12} data-retailer-field="tax_number">
                    <TextField
                      fullWidth
                      label={t("tax_registration_number_optional")}
                      name="tax_number"
                      value={formData.tax_number}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ my: 3, borderColor: alpha(theme.palette.primary.main, 0.12) }} />

                {/* Section 4: Upload Documents */}
                <RegisterSectionHeading>{t("upload_documents")}</RegisterSectionHeading>

                <Box
                  sx={{
                    my: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    borderLeft: 4,
                    borderColor: "primary.main",
                  }}
                >
                  <Box component="ul" sx={{ m: 0, pl: 2.5, color: "text.primary" }}>

                    <li>
                      <Typography variant="body1" color="textPrimary">
                        {t("business_registration_certificate")}

                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" color="textPrimary">
                        {t("trading_license_certificate")}

                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" color="textPrimary">
                        {t("chamber_commerce_certificate")}

                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" color="textPrimary">
                        {t("sponsor_passport_copy")}

                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" color="textPrimary">
                        {t("sponsor_eid_copy")}

                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" color="textPrimary">
                        {t("manager_passport_copy")}

                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" color="textPrimary">
                        {t("manager_visa_copy")}

                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" color="textPrimary">
                        {t("manager_eid_copy")}

                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" color="textPrimary">
                        {t("tenancy_contract_copy")}

                      </Typography>
                    </li>
                  </Box>
                </Box>


                <Box
                  sx={{
                    my: 2,
                    "& .MuiButton-outlined": {
                      borderRadius: 2,
                      py: 1.15,
                      textTransform: "none",
                      fontWeight: 600,
                    },
                  }}
                >
                  <Button
                    data-retailer-field="business_certificate"
                    variant="outlined"
                    fullWidth
                    startIcon={<CloudUpload />}
                    component="label"
                    color={errors.business_certificate ? "error" : "primary"}
                    sx={{
                      mb: 2,
                      borderColor: errors.business_certificate ? '#d32f2f' : undefined,
                      '&:hover': {
                        borderColor: errors.business_certificate ? '#d32f2f' : undefined,
                      }
                    }}
                  >
                    {t("upload_business_registration_certificate")}
                    <input
                      type="file"
                      name="business_certificate"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.documents.business_certificate && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.main, 0.06), borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {formData.documents.business_certificate.name}
                      </Typography>
                      <Button
                        type="button"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleFileRemove("business_certificate")}
                      >
                        {t("remove") || "Remove"}
                      </Button>
                    </Box>
                  )}
                  {errors.business_certificate && (
                    <Typography color="error" sx={{ mt: -1, mb: 4 }}>{errors.business_certificate}</Typography>
                  )}

                  <Button
                    data-retailer-field="trading_license_certificate"
                    variant="outlined"
                    fullWidth
                    startIcon={<CloudUpload />}
                    component="label"
                    color={errors.trading_license_certificate ? "error" : "primary"}
                    sx={{
                      mb: 2,
                      borderColor: errors.trading_license_certificate ? '#d32f2f' : undefined,
                      '&:hover': {
                        borderColor: errors.trading_license_certificate ? '#d32f2f' : undefined,
                      }
                    }}
                  >
                    {t("upload_trading_license_certificate")}
                    <input
                      type="file"
                      name="trading_license_certificate"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.documents.trading_license_certificate && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.main, 0.06), borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {formData.documents.trading_license_certificate.name}
                      </Typography>
                      <Button
                        type="button"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleFileRemove("trading_license_certificate")}
                      >
                        {t("remove") || "Remove"}
                      </Button>
                    </Box>
                  )}
                  {errors.trading_license_certificate && (
                    <Typography color="error" sx={{ mt: -1, mb: 4 }}>{errors.trading_license_certificate}</Typography>
                  )}

                  <Button
                    data-retailer-field="chamber_of_commerce_certificate"
                    variant="outlined"
                    fullWidth
                    startIcon={<CloudUpload />}
                    component="label"
                    color={errors.chamber_of_commerce_certificate ? "error" : "primary"}
                    sx={{
                      mb: 2,
                      borderColor: errors.chamber_of_commerce_certificate ? '#d32f2f' : undefined,
                      '&:hover': {
                        borderColor: errors.chamber_of_commerce_certificate ? '#d32f2f' : undefined,
                      }
                    }}
                  >
                    {t("upload_chamber_of_commerce_certificate")}
                    <input
                      type="file"
                      name="chamber_of_commerce_certificate"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.documents.chamber_of_commerce_certificate && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.main, 0.06), borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {formData.documents.chamber_of_commerce_certificate.name}
                      </Typography>
                      <Button
                        type="button"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleFileRemove("chamber_of_commerce_certificate")}
                      >
                        {t("remove") || "Remove"}
                      </Button>
                    </Box>
                  )}
                  {errors.chamber_of_commerce_certificate && (
                    <Typography color="error" sx={{ mt: -1, mb: 4 }}>{errors.chamber_of_commerce_certificate}</Typography>
                  )}

                  <Button
                    data-retailer-field="sponsor_passport_copy"
                    variant="outlined"
                    fullWidth
                    startIcon={<CloudUpload />}
                    component="label"
                    color={errors.sponsor_passport_copy ? "error" : "primary"}
                    sx={{
                      mb: 2,
                      borderColor: errors.sponsor_passport_copy ? '#d32f2f' : undefined,
                      '&:hover': {
                        borderColor: errors.sponsor_passport_copy ? '#d32f2f' : undefined,
                      }
                    }}
                  >
                    {t("upload_sponsor_passport_copy")}
                    <input
                      type="file"
                      name="sponsor_passport_copy"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.documents.sponsor_passport_copy && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.main, 0.06), borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {formData.documents.sponsor_passport_copy.name}
                      </Typography>
                      <Button
                        type="button"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleFileRemove("sponsor_passport_copy")}
                      >
                        {t("remove") || "Remove"}
                      </Button>
                    </Box>
                  )}
                  {errors.sponsor_passport_copy && (
                    <Typography color="error" sx={{ mt: -1, mb: 4 }}>{errors.sponsor_passport_copy}</Typography>
                  )}

                  <Button
                    data-retailer-field="sponsor_eid_copy"
                    variant="outlined"
                    fullWidth
                    startIcon={<CloudUpload />}
                    component="label"
                    color={errors.sponsor_eid_copy ? "error" : "primary"}
                    sx={{
                      mb: 2,
                      borderColor: errors.sponsor_eid_copy ? '#d32f2f' : undefined,
                      '&:hover': {
                        borderColor: errors.sponsor_eid_copy ? '#d32f2f' : undefined,
                      }
                    }}
                  >
                    {t("upload_sponsor_eid_copy")}
                    <input
                      type="file"
                      name="sponsor_eid_copy"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.documents.sponsor_eid_copy && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.main, 0.06), borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {formData.documents.sponsor_eid_copy.name}
                      </Typography>
                      <Button
                        type="button"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleFileRemove("sponsor_eid_copy")}
                      >
                        {t("remove") || "Remove"}
                      </Button>
                    </Box>
                  )}
                  {errors.sponsor_eid_copy && (
                    <Typography color="error" sx={{ mt: -1, mb: 4 }}>{errors.sponsor_eid_copy}</Typography>
                  )}

                  <Button
                    data-retailer-field="manager_passport_copy"
                    variant="outlined"
                    fullWidth
                    startIcon={<CloudUpload />}
                    component="label"
                    color={errors.manager_passport_copy ? "error" : "primary"}
                    sx={{
                      mb: 2,
                      borderColor: errors.manager_passport_copy ? '#d32f2f' : undefined,
                      '&:hover': {
                        borderColor: errors.manager_passport_copy ? '#d32f2f' : undefined,
                      }
                    }}
                  >
                    {t("upload_manager_passport_copy")}
                    <input
                      type="file"
                      name="manager_passport_copy"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.documents.manager_passport_copy && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.main, 0.06), borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {formData.documents.manager_passport_copy.name}
                      </Typography>
                      <Button
                        type="button"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleFileRemove("manager_passport_copy")}
                      >
                        {t("remove") || "Remove"}
                      </Button>
                    </Box>
                  )}
                  {errors.manager_passport_copy && (
                    <Typography color="error" sx={{ mt: -1, mb: 4 }}>{errors.manager_passport_copy}</Typography>
                  )}

                  <Button
                    data-retailer-field="manager_visa_copy"
                    variant="outlined"
                    fullWidth
                    startIcon={<CloudUpload />}
                    component="label"
                    color={errors.manager_visa_copy ? "error" : "primary"}
                    sx={{
                      mb: 2,
                      borderColor: errors.manager_visa_copy ? '#d32f2f' : undefined,
                      '&:hover': {
                        borderColor: errors.manager_visa_copy ? '#d32f2f' : undefined,
                      }
                    }}
                  >
                    {t("upload_manager_visa_copy")}
                    <input
                      type="file"
                      name="manager_visa_copy"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.documents.manager_visa_copy && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.main, 0.06), borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {formData.documents.manager_visa_copy.name}
                      </Typography>
                      <Button
                        type="button"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleFileRemove("manager_visa_copy")}
                      >
                        {t("remove") || "Remove"}
                      </Button>
                    </Box>
                  )}
                  {errors.manager_visa_copy && (
                    <Typography color="error" sx={{ mt: -1, mb: 4 }}>{errors.manager_visa_copy}</Typography>
                  )}

                  <Button
                    data-retailer-field="manager_eid_copy"
                    variant="outlined"
                    fullWidth
                    startIcon={<CloudUpload />}
                    component="label"
                    color={errors.manager_eid_copy ? "error" : "primary"}
                    sx={{
                      mb: 2,
                      borderColor: errors.manager_eid_copy ? '#d32f2f' : undefined,
                      '&:hover': {
                        borderColor: errors.manager_eid_copy ? '#d32f2f' : undefined,
                      }
                    }}
                  >
                    {t("upload_manager_eid_copy")}
                    <input
                      type="file"
                      name="manager_eid_copy"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.documents.manager_eid_copy && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.main, 0.06), borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {formData.documents.manager_eid_copy.name}
                      </Typography>
                      <Button
                        type="button"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleFileRemove("manager_eid_copy")}
                      >
                        {t("remove") || "Remove"}
                      </Button>
                    </Box>
                  )}
                  {errors.manager_eid_copy && (
                    <Typography color="error" sx={{ mt: -1, mb: 4 }}>{errors.manager_eid_copy}</Typography>
                  )}

                  <Button
                    data-retailer-field="tenancy_contract_copy"
                    variant="outlined"
                    fullWidth
                    startIcon={<CloudUpload />}
                    component="label"
                    color={errors.tenancy_contract_copy ? "error" : "primary"}
                    sx={{
                      mb: 2,
                      borderColor: errors.tenancy_contract_copy ? '#d32f2f' : undefined,
                      '&:hover': {
                        borderColor: errors.tenancy_contract_copy ? '#d32f2f' : undefined,
                      }
                    }}
                  >
                    {t("upload_tenancy_contract_copy")}
                    <input
                      type="file"
                      name="tenancy_contract_copy"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.documents.tenancy_contract_copy && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.main, 0.06), borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {formData.documents.tenancy_contract_copy.name}
                      </Typography>
                      <Button
                        type="button"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleFileRemove("tenancy_contract_copy")}
                      >
                        {t("remove") || "Remove"}
                      </Button>
                    </Box>
                  )}
                  {errors.tenancy_contract_copy && (
                    <Typography color="error" sx={{ mt: -1, mb: 4 }}>{errors.tenancy_contract_copy}</Typography>
                  )}

                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<CloudUpload />}
                    component="label"
                    sx={{ mb: 2 }}
                  >
                    {t("upload_tax_certification_document")}
                    <input
                      type="file"
                      name="tax_certificate"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.documents.tax_certificate && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, p: 1, bgcolor: alpha(theme.palette.primary.main, 0.06), borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {formData.documents.tax_certificate.name}
                      </Typography>
                      <Button
                        type="button"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleFileRemove("tax_certificate")}
                      >
                        {t("remove") || "Remove"}
                      </Button>
                    </Box>
                  )}
                </Box>

                {/* Section 5: Agreement & Submission */}
                <FormControlLabel
                  data-retailer-field="terms_accepted"
                  sx={{ alignItems: "flex-start", ml: 0 }}
                  control={
                    <Checkbox
                      name="terms_accepted"
                      className="poppins"
                      checked={formData.terms_accepted}
                      onChange={(e) => {
                        setFormError("");
                        setFormData((prev) => ({ ...prev, terms_accepted: e.target.checked }));
                      }}
                      color="primary"
                      sx={{ pt: 0.25 }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.primary" sx={{ display: "inline", lineHeight: 1.6 }}>
                      {t("i_agree_to_the")}{" "}
                      <Box
                        component="a"
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "primary.main", fontWeight: 600, textDecoration: "underline" }}
                      >
                        {t("terms_and_conditions")}
                      </Box>
                      .
                    </Typography>
                  }
                />

                {errors.terms_accepted && (
                  <Typography color="error">{errors.terms_accepted}</Typography>
                )}
                <Button
                  fullWidth
                  className="poppins"
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                    boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
                    "&:hover": {
                      boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.45)}`,
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : t("register_now")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        </>
      </Box>
      : <ThankYou />
  );
};

export default RetailerRegistration;

export const ThankYou = () => {
  const { t } = useTranslation(); // Hook for translations
  const navigate = useNavigate();
  const theme = useTheme();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "grey.50",
        px: 2,
        py: 6,
      }}
    >
      <Box
        sx={{
          maxWidth: 520,
          width: "100%",
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" className="poppins" sx={{ mb: 2, color: "primary.main", fontWeight: 800 }}>
          🎉 {t("thank_you_for_registering")}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
          {t("registration_success_message")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          className="poppins"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            px: 4,
            py: 1.25,
            borderRadius: 2,
            boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
          }}
        >
          {t("back_to_home")}
        </Button>
      </Box>
    </Box>
  );
};