#!/usr/bin/env node
/*
  Dynamic sitemap generator
  - Fetches slugs for products, categories, brands, deals from configurable APIs
  - Writes a single combined sitemap to public/sitemap.xml

  Configure via environment variables:
    SITE_URL=https://buraqstar.com
    BACKEND_URL=http://127.0.0.1:8000/api/v1  (for local development)
    SITEMAP_PRODUCTS_API=http://127.0.0.1:8000/api/v1/category/products?category_id=0&type=all&limit=1000
    SITEMAP_CATEGORIES_API=http://127.0.0.1:8000/api/v1/all-categories
    SITEMAP_BRANDS_API=http://127.0.0.1:8000/api/v1/all-brands
    SITEMAP_DEALS_API=http://127.0.0.1:8000/api/v1/all-deals

  Uses the same APIs that the frontend uses (matching ajax-service.js), with the 
  same URL generation logic. Automatically generates hierarchical URLs for 
  categories and deals based on the nested structure returned by the APIs.
*/

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'https://buraqstar.com';
const BACKEND_URL = process.env.BACKEND_URL || 'https://admin.buraqstar.com/api/v1';

// Use the same APIs that the frontend uses (matching ajax-service.js)
const PRODUCTS_API = process.env.SITEMAP_PRODUCTS_API || `${BACKEND_URL}/category/products?category_id=0&type=all&limit=1000`;
const CATEGORIES_API = process.env.SITEMAP_CATEGORIES_API || `${BACKEND_URL}/all-categories`;
const BRANDS_API = process.env.SITEMAP_BRANDS_API || `${BACKEND_URL}/all-brands`;
const DEALS_API = process.env.SITEMAP_DEALS_API || `${BACKEND_URL}/all-deals`;

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

// Same createSlug function used in frontend
function createSlug(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

async function fetchJson(url) {
  if (!url) return [];
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    
    // Handle the API response format: {success: true, data: [...]}
    if (data && data.success && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (err) {
    return [];
  }
}

function toUrl(loc, changefreq = 'weekly', priority = '0.5', lastmod) {
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>${lastmodTag}\n  </url>`;
}

function writeSitemap(filename, urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(PUBLIC_DIR, filename), xml, 'utf8');
}

async function main() {
  // Debug logging removed for production
  
  // Ensure public dir exists
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const now = new Date().toISOString();

  const [categories, brands, deals] = await Promise.all([
    fetchJson(CATEGORIES_API),
    fetchJson(BRANDS_API),
    fetchJson(DEALS_API),
  ]);

  // Build URLs using the same logic as frontend
  const productUrls = [];
  const categoryUrls = [];
  const brandUrls = [];
  const dealUrls = [];

  // Generate product URLs with pagination
  let allProducts = [];
  let offset = 0;
  const limit = 15; // Same as frontend pagination
  
  while (true) {
    try {
      const paginatedUrl = `${PRODUCTS_API}&offset=${offset}`;
      const res = await fetch(paginatedUrl);
      if (!res.ok) break;
      
      const data = await res.json();
      if (!data.success || !data.data || data.data.length === 0) break;
      
      allProducts = [...allProducts, ...data.data];
      
      // If we got less than the limit, we've reached the end
      if (data.data.length < limit) break;
      
      offset += limit;
    } catch (err) {
      break;
    }
  }
  
  if (allProducts.length > 0) {
    for (const product of allProducts) {
      const slug = product.slug || createSlug(product.name);
      if (slug) {
        productUrls.push(toUrl(`${SITE_URL}/product/${slug}`, 'weekly', '0.8', now));
      }
    }
  }

  // Generate category URLs (same logic as frontend)
  if (categories && categories.length > 0) {
    for (const category of categories) {
      const parentSlug = category.slug || createSlug(category.name);
      if (parentSlug) {
        // Parent category: /category/parent
        categoryUrls.push(toUrl(`${SITE_URL}/category/${parentSlug}`, 'weekly', '0.7', now));
        
        // Child categories: /category/parent/child
        if (category.childrens && category.childrens.length > 0) {
          for (const child of category.childrens) {
            const childSlug = child.slug || createSlug(child.name);
            if (childSlug) {
              categoryUrls.push(toUrl(`${SITE_URL}/category/${parentSlug}/${childSlug}`, 'weekly', '0.6', now));
              
              // Subchild categories: /category/parent/child/subchild
              if (child.childrens && child.childrens.length > 0) {
                for (const subchild of child.childrens) {
                  const subchildSlug = subchild.slug || createSlug(subchild.name);
                  if (subchildSlug) {
                    categoryUrls.push(toUrl(`${SITE_URL}/category/${parentSlug}/${childSlug}/${subchildSlug}`, 'weekly', '0.5', now));
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // Generate brand URLs (using the same structure as deals)
  if (brands && brands.length > 0) {
    for (const brand of brands) {
      const brandSlug = brand.slug || createSlug(brand.name);
      if (brandSlug) {
        // Brand only: /brand/brand
        brandUrls.push(toUrl(`${SITE_URL}/brand/${brandSlug}`, 'weekly', '0.6', now));
        
        // Brand with categories: /brand/brand/parent/child/subchild
        // Based on the API response structure with children and subchildren arrays
        if (brand.categories && brand.categories.length > 0) {
          for (const category of brand.categories) {
            const parentSlug = category.slug || createSlug(category.name);
            if (parentSlug) {
              // Brand with parent: /brand/brand/parent
              brandUrls.push(toUrl(`${SITE_URL}/brand/${brandSlug}/${parentSlug}`, 'weekly', '0.5', now));
              
              // Brand with child: /brand/brand/parent/child
              if (category.children && category.children.length > 0) {
                for (const child of category.children) {
                  const childSlug = child.slug || createSlug(child.name);
                  if (childSlug) {
                    brandUrls.push(toUrl(`${SITE_URL}/brand/${brandSlug}/${parentSlug}/${childSlug}`, 'weekly', '0.4', now));
                    
                    // Brand with subchild: /brand/brand/parent/child/subchild
                    if (child.subchildren && child.subchildren.length > 0) {
                      for (const subchild of child.subchildren) {
                        const subchildSlug = subchild.slug || createSlug(subchild.name);
                        if (subchildSlug) {
                          brandUrls.push(toUrl(`${SITE_URL}/brand/${brandSlug}/${parentSlug}/${childSlug}/${subchildSlug}`, 'weekly', '0.3', now));
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // Generate deal URLs (using the correct API response structure)
  if (deals && deals.length > 0) {
    for (const deal of deals) {
      const dealSlug = deal.slug || createSlug(deal.name);
      if (dealSlug) {
        // Deal only: /deals/deal
        dealUrls.push(toUrl(`${SITE_URL}/deals/${dealSlug}`, 'weekly', '0.6', now));
        
        // Deal with categories: /deals/deal/parent/child/subchild
        // Based on the correct API response structure with children and subchildren arrays
        if (deal.categories && deal.categories.length > 0) {
          for (const category of deal.categories) {
            const parentSlug = category.slug || createSlug(category.name);
            if (parentSlug) {
              // Deal with parent: /deals/deal/parent
              dealUrls.push(toUrl(`${SITE_URL}/deals/${dealSlug}/${parentSlug}`, 'weekly', '0.5', now));
              
              // Deal with child: /deals/deal/parent/child
              if (category.children && category.children.length > 0) {
                for (const child of category.children) {
                  const childSlug = child.slug || createSlug(child.name);
                  if (childSlug) {
                    dealUrls.push(toUrl(`${SITE_URL}/deals/${dealSlug}/${parentSlug}/${childSlug}`, 'weekly', '0.4', now));
                    
                    // Deal with subchild: /deals/deal/parent/child/subchild
                    if (child.subchildren && child.subchildren.length > 0) {
                      for (const subchild of child.subchildren) {
                        const subchildSlug = subchild.slug || createSlug(subchild.name);
                        if (subchildSlug) {
                          dealUrls.push(toUrl(`${SITE_URL}/deals/${dealSlug}/${parentSlug}/${childSlug}/${subchildSlug}`, 'weekly', '0.3', now));
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // Compose a single sitemap with static + dynamic URLs
  const staticUrls = [
    toUrl(`${SITE_URL}/`, 'daily', '1.0', now),
    toUrl(`${SITE_URL}/about`, 'monthly', '0.6', now),
    toUrl(`${SITE_URL}/contact`, 'monthly', '0.6', now),
    toUrl(`${SITE_URL}/blogs`, 'weekly', '0.7', now),
    toUrl(`${SITE_URL}/faq`, 'monthly', '0.5', now),
    toUrl(`${SITE_URL}/catalogue`, 'monthly', '0.5', now),
    toUrl(`${SITE_URL}/store-locator`, 'monthly', '0.5', now),
    toUrl(`${SITE_URL}/customer-support`, 'monthly', '0.5', now),
    toUrl(`${SITE_URL}/terms`, 'yearly', '0.3', now),
    toUrl(`${SITE_URL}/policy`, 'yearly', '0.3', now),
    toUrl(`${SITE_URL}/shipping-policy`, 'yearly', '0.3', now),
    toUrl(`${SITE_URL}/cancellation-return-policy`, 'yearly', '0.3', now),
    toUrl(`${SITE_URL}/user/login`, 'yearly', '0.2', now),
    toUrl(`${SITE_URL}/user/registration`, 'yearly', '0.2', now),
    toUrl(`${SITE_URL}/user/forgot-password`, 'yearly', '0.2', now),
    toUrl(`${SITE_URL}/user/reset-password`, 'yearly', '0.2', now),
  ];

  const allUrls = [
    ...staticUrls,
    ...productUrls,
    ...categoryUrls,
    ...brandUrls,
    ...dealUrls,
  ];

  // Output summary (logging removed)

  writeSitemap('sitemap.xml', allUrls);
  
  // Done
}

main().catch((err) => {
  console.error('[sitemap] Failed:', err);
  process.exit(1);
});
