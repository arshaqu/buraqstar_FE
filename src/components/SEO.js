import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../constants';

const SEO = ({
  title = "Buraq - Premium Electrical & Hardware Solutions",
  description = "UAE-based premium electrical and hardware supplier offering power tools, hand tools, lighting, and sanitary solutions. Our own brands NOVEX, BURAQ, CAVIL, and ZILCO.",
  keywords = "Power Tools, Hand tools, Lighting, Hardware & Sanitary Solutions, Novex light supplier, Plumbing materials suppliers in Dubai, Safety equipment, Novex Solar lights, Novex led panel light, NOVEX BURAQ CAVIL ZILCO SUPPLIER IN UAE, Electrical Equipments, Building materials wholesale suppliers in UAE, Fan Exhaust, Aluminium profiles, Kitchen sink, Paint brush and roller, Shower filter, Jig saw, Heat gun, Chandelier light, Wrench, Water filter, Water Heater, Garden Hose pipe, Half pedestal wash basin, Lamp Holder, Lantern light, Travel adapter, Online hand tools and power tools in UAE",
  image = "/buraq_logo.jpeg",
  url = "",
  type = "website",
  structuredData = null,
  canonical = "",
  noindex = false,
  nofollow = false
}) => {
  // Use SITE_URL constant
  const siteUrl = SITE_URL;
  
  // Ensure image URL is always absolute
  let fullImageUrl;
  if (image.startsWith('http://') || image.startsWith('https://')) {
    fullImageUrl = image;
  } else if (image.startsWith('//')) {
    fullImageUrl = `https:${image}`;
  } else {
    // Ensure image path starts with /
    const imagePath = image.startsWith('/') ? image : `/${image}`;
    fullImageUrl = `${siteUrl}${imagePath}`;
  }
  
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : fullUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots Meta */}
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Buraq" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@buraq" />
      <meta name="twitter:creator" content="@buraq" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Buraq" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1a365d" />
      
      {/* Language and Direction */}
      <meta httpEquiv="Content-Language" content="en" />
      
      {/* Structured Data */}
      {structuredData && (
        <>
          {Array.isArray(structuredData) ? (
            structuredData.map((data, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(data)}
              </script>
            ))
          ) : (
            <script type="application/ld+json">
              {JSON.stringify(structuredData)}
            </script>
          )}
        </>
      )}
      
      {/* Default Structured Data for Organization */}
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Buraq",
            "url": siteUrl,
            "logo": `${siteUrl}/buraqlogo.svg`,
            "description": "UAE-based premium electrical and hardware supplier offering power tools, hand tools, lighting, and sanitary solutions. Our own brands NOVEX, BURAQ, CAVIL, and ZILCO.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "AE"
            },
            "sameAs": [
              "https://www.facebook.com/buraqstartrading",
              "https://www.instagram.com/buraqstar/?next=%2F&hl=en",
              "https://www.youtube.com/channel/UC7jBbp5U9O2PPa99zjGDXtA",
              "https://www.linkedin.com/company/buraq-star-trading-co-llc",
              "https://x.com/BuraqstarUAE",
              "https://www.pinterest.com/buraqstartrading/",
              "https://www.tiktok.com/@buraq.star?lang=en"
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
