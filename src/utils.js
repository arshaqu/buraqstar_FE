import novex from "./assets/novex.jpg";
import buraq from "./assets/buraqabout.jpg";
import cavil from "./assets/cavilabout.png";
import zilco from "./assets/zilcoabout.png";
import { BRANDS } from "./constants";

export function getName(item, locale) {
    if (!item) return '';
    if (locale === 'ar') return item.name_ar || item.name || '';
    if (locale === 'ur') return item.name_ur || item.name || '';
    return item.name || '';
}

export function getDescription(item, locale) {
    if (!item) return '';
    if (locale === 'ar') return item.description_ar || item.description || '';
    if (locale === 'ur') return item.description_ur || item.description || '';
    return item.description || '';
}

export function getCategoryName(category, locale) {
    if (!category) return '';
    if (locale === 'ar') return category.name_ar || category.name || '';
    if (locale === 'ur') return category.name_ur || category.name || '';
    return category.name || '';
}

export function getBrandLogo(brand) {
    switch (brand) {
        case BRANDS.BURAQ:
            return buraq;
        case BRANDS.NOVEX:
            return novex;
        case BRANDS.CAVIL:
            return cavil;
        case BRANDS.ZILCO:
            return zilco;
        default:
            return null;
    }
}

// Slug utility function for SEO-friendly URLs
export function createSlug(text) {
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

export const routes = {
    home: '/',
    thankYou: '/thankyou',
    paymentFailed: '/payment-failed',
    category: '/category/:parentSlug?/:childSlug?/:subChildSlug?',
    checkout: '/checkout',
    brand: '/brand/:brandSlug?/:parentSlug?/:childSlug?/:subChildSlug?',
    deals: '/deals/:dealSlug?/:parentSlug?/:childSlug?/:subChildSlug?',
    product: '/product/:slug?',
    about: '/about',
    terms: '/terms',
    policy: '/policy',
    customer_support: '/customer-support',
    shipping_policy: '/shipping-policy',
    return_policy: '/return-policy',
    blogs: '/blogs',
    blog: '/blog/:slug?',
    contact: '/contact',
    faq: '/faq',
    cart: '/cart',
    storeLocator: '/store-locator',
    catalogue: '/catalogue',
    coming_soon: '/comming-soon',
    login: '/user/login',
    registration: '/user/registration',
    forgot_password: '/user/forgot-password',
    reset_password: '/user/reset-password',
    retailer_registration: '/retailer/registration',
    verify: '/user/verify-account',
    wishlist: '/user/wishlists',
    dashboard: '/user/dashboard',
    myOrder: '/user/my-order',
    myProfile: '/user/profile',
};

export default routes;
