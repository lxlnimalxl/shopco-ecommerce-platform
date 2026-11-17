import heroModels from '../assets/images/hero-fashion-models.png';
import sparkleStar from '../assets/images/sparkle-star.png';
import figmaCover from '../assets/images/figma-cover.png';
import styleCasual from '../assets/images/style-casual.png';
import styleFormal from '../assets/images/style-formal.png';
import styleGym from '../assets/images/style-gym.png';
import styleParty from '../assets/images/style-party.png';

import productTapeTshirt from '../assets/images/product-tape-tshirt.png';
import productSkinnyJeans from '../assets/images/product-skinny-jeans.png';
import productCheckeredShirt from '../assets/images/product-checkered-shirt.png';
import productStripedTshirt from '../assets/images/product-striped-tshirt.png';
import productVerticalShirt from '../assets/images/product-vertical-shirt.png';
import productCourageTshirt from '../assets/images/product-courage-tshirt.png';
import productBermudaShorts from '../assets/images/product-bermuda-shorts.png';
import productFadedJeans from '../assets/images/product-faded-jeans.png';
import productGradientTshirt from '../assets/images/product-gradient-tshirt.png';
import productPoloTipping from '../assets/images/product-polo-tipping.png';
import productBlackStriped from '../assets/images/product-black-striped.png';
import productPoloContrast from '../assets/images/product-polo-contrast.png';

import pdpDetail1 from '../assets/images/pdp-detail-1.png';
import pdpDetail2 from '../assets/images/pdp-detail-2.png';
import pdpDetail3 from '../assets/images/pdp-detail-3.png';

const API_BASE = 'http://127.0.0.1:8000/api';

export const imageAssets = {
  'hero-fashion-models.png': heroModels,
  'sparkle-star.png': sparkleStar,
  'figma-cover.png': figmaCover,
  'style-casual.png': styleCasual,
  'style-formal.png': styleFormal,
  'style-gym.png': styleGym,
  'style-party.png': styleParty,

  'product-tape-tshirt.png': productTapeTshirt,
  'product-skinny-jeans.png': productSkinnyJeans,
  'product-checkered-shirt.png': productCheckeredShirt,
  'product-striped-tshirt.png': productStripedTshirt,
  'product-vertical-shirt.png': productVerticalShirt,
  'product-courage-tshirt.png': productCourageTshirt,
  'product-bermuda-shorts.png': productBermudaShorts,
  'product-faded-jeans.png': productFadedJeans,
  'product-gradient-tshirt.png': productGradientTshirt,
  'product-polo-tipping.png': productPoloTipping,
  'product-black-striped.png': productBlackStriped,
  'product-polo-contrast.png': productPoloContrast,

  'pdp-detail-1.png': pdpDetail1,
  'pdp-detail-2.png': pdpDetail2,
  'pdp-detail-3.png': pdpDetail3,
};

export const resolveImage = (name, fallback = pdpDetail1) => {
  if (!name) return fallback;
  if (name.startsWith('http://') || name.startsWith('https://') || name.startsWith('data:')) {
    return name;
  }
  return imageAssets[name] || fallback;
};

// Initial offline fallback catalog
export const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "One Life Graphic T-shirt",
    slug: "one-life-graphic-tshirt",
    category_name: "T-Shirts",
    brand_name: "Calvin Klein",
    dress_style: "casual",
    price: 260.00,
    original_price: 300.00,
    discount_percent: 40,
    rating: 4.5,
    review_count: 451,
    description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    colors_csv: "#4F4631,#314F4A,#31344F",
    sizes_csv: "Small,Medium,Large,X-Large",
    stock: 35,
    is_new_arrival: true,
    is_top_selling: true,
    featured: true,
    main_image: "pdp-detail-1.png",
    gallery_images_csv: "pdp-detail-1.png,pdp-detail-2.png,pdp-detail-3.png",
    reviews: [
      { id: 101, author_name: "Samantha D.", rating: 5, is_verified: true, comment: "I absolutely love this t-shirt! The design is unique and the fabric feels so light and comfortable. As someone who values both fashion and comfort, this was a must-have!", created_at: "Posted on August 14, 2026" },
      { id: 102, author_name: "Alex M.", rating: 5, is_verified: true, comment: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I appreciate the attention to detail. Definitely recommending!", created_at: "Posted on August 15, 2026" },
      { id: 103, author_name: "Ethan R.", rating: 4, is_verified: true, comment: "This t-shirt is a must-have for anyone who appreciates quality design. The minimalist yet stylish pattern caught my eye, and the fit is spot on.", created_at: "Posted on August 16, 2026" },
      { id: 104, author_name: "Olivia P.", rating: 5, is_verified: true, comment: "As a fashion enthusiast, I'm always on the lookout for unique pieces. This t-shirt is not only comfortable but also turns heads with its bold graphic design.", created_at: "Posted on August 17, 2026" },
      { id: 105, author_name: "Liam K.", rating: 4, is_verified: true, comment: "This graphic tee is effortlessly cool. Paired with denim or shorts, it creates an effortless streetwear aesthetic that always gets compliments.", created_at: "Posted on August 18, 2026" },
      { id: 106, author_name: "Ava H.", rating: 5, is_verified: true, comment: "I'm not usually into graphic tees, but the design on this one won me over. The texture is soft, breathable, and holds up great in the wash!", created_at: "Posted on August 19, 2026" },
    ]
  },
  {
    id: 2,
    title: "T-SHIRT WITH TAPE DETAILS",
    slug: "tshirt-with-tape-details",
    category_name: "T-Shirts",
    brand_name: "Zara",
    dress_style: "casual",
    price: 120.00,
    original_price: null,
    discount_percent: 0,
    rating: 4.5,
    review_count: 184,
    description: "Minimalist monochrome t-shirt featuring branded woven tape details across the sleeves and hemline.",
    colors_csv: "#000000,#FFFFFF,#2E4057",
    sizes_csv: "Small,Medium,Large,X-Large",
    stock: 40,
    is_new_arrival: true,
    main_image: "product-tape-tshirt.png",
    gallery_images_csv: "product-tape-tshirt.png",
    reviews: []
  },
  {
    id: 3,
    title: "SKINNY FIT JEANS",
    slug: "skinny-fit-jeans",
    category_name: "Jeans",
    brand_name: "Calvin Klein",
    dress_style: "casual",
    price: 240.00,
    original_price: 260.00,
    discount_percent: 20,
    rating: 3.5,
    review_count: 92,
    description: "Ultra-stretch dark blue denim tailored for a sleek skinny silhouette with reinforced stitching.",
    colors_csv: "#1B263B,#415A77,#0D1B2A",
    sizes_csv: "Small,Medium,Large,X-Large",
    stock: 25,
    is_new_arrival: true,
    main_image: "product-skinny-jeans.png",
    gallery_images_csv: "product-skinny-jeans.png",
    reviews: []
  },
  {
    id: 4,
    title: "CHECKERED SHIRT",
    slug: "checkered-shirt",
    category_name: "Shirts",
    brand_name: "Prada",
    dress_style: "formal",
    price: 180.00,
    original_price: null,
    discount_percent: 0,
    rating: 4.5,
    review_count: 210,
    description: "Timeless buffalo checkered flannel shirt with button-down collar and twin chest patch pockets.",
    colors_csv: "#C1121F,#003049,#780000",
    sizes_csv: "Medium,Large,X-Large",
    stock: 30,
    is_new_arrival: true,
    main_image: "product-checkered-shirt.png",
    gallery_images_csv: "product-checkered-shirt.png",
    reviews: []
  },
  {
    id: 5,
    title: "SLEEVE STRIPED T-SHIRT",
    slug: "sleeve-striped-tshirt",
    category_name: "T-Shirts",
    brand_name: "Gucci",
    dress_style: "casual",
    price: 130.00,
    original_price: 160.00,
    discount_percent: 30,
    rating: 4.5,
    review_count: 138,
    description: "Relaxed crewneck tee with sporty contrast multi-colored arm stripes on premium cotton jersey.",
    colors_csv: "#FA8072,#F4A261,#E76F51",
    sizes_csv: "Small,Medium,Large",
    stock: 45,
    is_new_arrival: true,
    main_image: "product-striped-tshirt.png",
    gallery_images_csv: "product-striped-tshirt.png",
    reviews: []
  },
  {
    id: 6,
    title: "VERTICAL STRIPED SHIRT",
    slug: "vertical-striped-shirt",
    category_name: "Shirts",
    brand_name: "Versace",
    dress_style: "formal",
    price: 212.00,
    original_price: 232.00,
    discount_percent: 20,
    rating: 5.0,
    review_count: 320,
    description: "Luxury vertical stripe collared button-down shirt designed for both casual elegance and smart formalwear.",
    colors_csv: "#2A9D8F,#264653,#E9C46A",
    sizes_csv: "Small,Medium,Large,X-Large",
    stock: 60,
    is_top_selling: true,
    main_image: "product-vertical-shirt.png",
    gallery_images_csv: "product-vertical-shirt.png",
    reviews: []
  },
  {
    id: 7,
    title: "COURAGE GRAPHIC T-SHIRT",
    slug: "courage-graphic-tshirt",
    category_name: "T-Shirts",
    brand_name: "Zara",
    dress_style: "party",
    price: 145.00,
    original_price: null,
    discount_percent: 0,
    rating: 4.0,
    review_count: 215,
    description: "Vibrant typography statement tee in bold sunny orange featuring high-density front typography.",
    colors_csv: "#FF9F1C,#2EC4B6,#E71D36",
    sizes_csv: "Small,Medium,Large",
    stock: 50,
    is_top_selling: true,
    main_image: "product-courage-tshirt.png",
    gallery_images_csv: "product-courage-tshirt.png",
    reviews: []
  },
  {
    id: 8,
    title: "LOOSE FIT BERMUDA SHORTS",
    slug: "loose-fit-bermuda-shorts",
    category_name: "Shorts",
    brand_name: "Zara",
    dress_style: "gym",
    price: 80.00,
    original_price: null,
    discount_percent: 0,
    rating: 3.0,
    review_count: 85,
    description: "Comfort-focused relaxed cut cargo Bermuda shorts with elasticated drawstring waistband.",
    colors_csv: "#4A5759,#D8B4E2,#A5C4D4",
    sizes_csv: "Small,Medium,Large,X-Large",
    stock: 40,
    is_top_selling: true,
    main_image: "product-bermuda-shorts.png",
    gallery_images_csv: "product-bermuda-shorts.png",
    reviews: []
  },
  {
    id: 9,
    title: "FADED SKINNY JEANS",
    slug: "faded-skinny-jeans",
    category_name: "Jeans",
    brand_name: "Calvin Klein",
    dress_style: "casual",
    price: 210.00,
    original_price: null,
    discount_percent: 0,
    rating: 4.5,
    review_count: 190,
    description: "Acid-washed light blue distressed skinny jeans with authentic whiskers and slight knee abrasion.",
    colors_csv: "#A8DADC,#457B9D,#1D3557",
    sizes_csv: "Medium,Large,X-Large",
    stock: 35,
    is_top_selling: true,
    main_image: "product-faded-jeans.png",
    gallery_images_csv: "product-faded-jeans.png",
    reviews: []
  },
  {
    id: 10,
    title: "Gradient Graphic T-shirt",
    slug: "gradient-graphic-tshirt",
    category_name: "T-Shirts",
    brand_name: "Prada",
    dress_style: "casual",
    price: 145.00,
    original_price: null,
    discount_percent: 0,
    rating: 3.5,
    review_count: 112,
    description: "Artisanal gradient spray effect t-shirt made with combed ring-spun organic cotton.",
    colors_csv: "#E63946,#F1FAEE,#A8DADC",
    sizes_csv: "Small,Medium,Large",
    stock: 28,
    main_image: "product-gradient-tshirt.png",
    gallery_images_csv: "product-gradient-tshirt.png",
    reviews: []
  },
  {
    id: 11,
    title: "Polo with Tipping Details",
    slug: "polo-with-tipping-details",
    category_name: "Shirts",
    brand_name: "Gucci",
    dress_style: "formal",
    price: 180.00,
    original_price: null,
    discount_percent: 0,
    rating: 4.5,
    review_count: 176,
    description: "Sporty pique polo shirt featuring contrast ribbed collar and sleeve tipping.",
    colors_csv: "#118AB2,#073B4C,#06D6A0",
    sizes_csv: "Small,Medium,Large,X-Large",
    stock: 32,
    main_image: "product-polo-tipping.png",
    gallery_images_csv: "product-polo-tipping.png",
    reviews: []
  },
  {
    id: 12,
    title: "Black Striped T-shirt",
    slug: "black-striped-tshirt",
    category_name: "T-Shirts",
    brand_name: "Versace",
    dress_style: "party",
    price: 120.00,
    original_price: 150.00,
    discount_percent: 30,
    rating: 5.0,
    review_count: 230,
    description: "Parisian Breton style horizontal stripe t-shirt in monochrome jet black and crisp white.",
    colors_csv: "#000000,#FFFFFF,#333333",
    sizes_csv: "Small,Medium,Large",
    stock: 50,
    main_image: "product-black-striped.png",
    gallery_images_csv: "product-black-striped.png",
    reviews: []
  },
  {
    id: 13,
    title: "Polo with Contrast Trims",
    slug: "polo-with-contrast-trims",
    category_name: "Shirts",
    brand_name: "Prada",
    dress_style: "formal",
    price: 212.00,
    original_price: 242.00,
    discount_percent: 20,
    rating: 4.0,
    review_count: 98,
    description: "Modern cut polo shirt engineered with contrasting collar accents and mother-of-pearl buttons.",
    colors_csv: "#3D5A80,#98C1D9,#E0FBFC",
    sizes_csv: "Small,Medium,Large,X-Large",
    stock: 25,
    main_image: "product-polo-contrast.png",
    gallery_images_csv: "product-polo-contrast.png",
    reviews: []
  }
];

export const INITIAL_TESTIMONIALS = [
  { id: 1, customer_name: "Sarah M.", rating: 5, is_verified: true, comment: "\"I'm blown away by the quality and style of the clothes I received from SHOP.CO. From casual wear to elegant dresses, every item I've bought has exceeded my expectations.\"" },
  { id: 2, customer_name: "Alex K.", rating: 5, is_verified: true, comment: "\"Finding clothes that align with my personal style used to be a challenge until I discovered SHOP.CO. The range of options they offer is truly remarkable, catering to a variety of tastes.\"" },
  { id: 3, customer_name: "James L.", rating: 5, is_verified: true, comment: "\"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon SHOP.CO. The selection of clothes is not only diverse but also on-point with latest trends.\"" },
  { id: 4, customer_name: "Mooen T.", rating: 5, is_verified: true, comment: "\"The shopping experience was seamless, the size guides were 100% accurate, and delivery arrived 2 days earlier than scheduled. Absolutely my go-to fashion store!\"" }
];

// Local state caching
const loadState = (key, fallback) => {
  try {
    const raw = localStorage.getItem(`shopco_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const saveState = (key, data) => {
  try {
    localStorage.setItem(`shopco_${key}`, JSON.stringify(data));
  } catch (e) {
    console.warn('Storage save failed:', e);
  }
};

let localProducts = loadState('products', INITIAL_PRODUCTS);
let localOrders = loadState('orders', []);

export const api = {
  async getProducts(params = {}) {
    try {
      const url = new URL(`${API_BASE}/products/`);
      Object.keys(params).forEach(k => {
        if (params[k] !== undefined && params[k] !== '') {
          url.searchParams.set(k, params[k]);
        }
      });
      const res = await fetch(url.toString(), { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }

    let list = [...localProducts];

    if (params.category && params.category !== 'all') {
      const cat = params.category.toLowerCase();
      list = list.filter(p => p.category_name.toLowerCase().includes(cat) || p.slug.includes(cat));
    }

    if (params.dress_style && params.dress_style !== 'all') {
      const style = params.dress_style.toLowerCase();
      list = list.filter(p => p.dress_style.toLowerCase() === style);
    }

    if (params.new_arrivals === 'true') {
      list = list.filter(p => p.is_new_arrival);
    }

    if (params.top_selling === 'true') {
      list = list.filter(p => p.is_top_selling);
    }

    if (params.min_price) {
      list = list.filter(p => p.price >= Number(params.min_price));
    }

    if (params.max_price) {
      list = list.filter(p => p.price <= Number(params.max_price));
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q) ||
        p.brand_name.toLowerCase().includes(q)
      );
    }

    if (params.sort === 'price_low') {
      list.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price_high') {
      list.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  },

  async getProductDetail(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}/`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }
    return localProducts.find(p => p.id === Number(id)) || localProducts[0];
  },

  async addReview(productId, reviewData) {
    try {
      const res = await fetch(`${API_BASE}/products/${productId}/reviews/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
        signal: AbortSignal.timeout(1500)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }

    const newRev = {
      id: Date.now(),
      author_name: reviewData.author_name || "Verified Customer",
      rating: reviewData.rating || 5,
      is_verified: true,
      comment: reviewData.comment || "Great product quality!",
      created_at: "Just now"
    };

    localProducts = localProducts.map(p => {
      if (p.id === Number(productId)) {
        return {
          ...p,
          review_count: p.review_count + 1,
          reviews: [newRev, ...(p.reviews || [])]
        };
      }
      return p;
    });
    saveState('products', localProducts);
    return newRev;
  },

  async validateCoupon(code) {
    try {
      const res = await fetch(`${API_BASE}/coupons/validate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        signal: AbortSignal.timeout(1500)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }

    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'SHOP20') return { valid: true, code: 'SHOP20', discount_percent: 20, message: '20% discount applied!' };
    if (cleanCode === 'SUMMER30') return { valid: true, code: 'SUMMER30', discount_percent: 30, message: '30% summer discount applied!' };
    if (cleanCode === 'WELCOME10') return { valid: true, code: 'WELCOME10', discount_percent: 10, message: '10% welcome discount applied!' };
    return { valid: false, message: 'Invalid or expired promo code.' };
  },

  async createOrder(orderPayload) {
    try {
      const res = await fetch(`${API_BASE}/orders/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        const data = await res.json();
        localOrders.unshift(data);
        saveState('orders', localOrders);
        return data;
      }
    } catch {
      // offline fallback
    }

    const orderNum = `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const newOrder = {
      id: Date.now(),
      order_number: orderNum,
      customer_name: orderPayload.customer_name || "Valued Shopper",
      customer_email: orderPayload.customer_email || "shopper@shop.co",
      customer_phone: orderPayload.customer_phone || "+1 (555) 234-5678",
      shipping_address: orderPayload.shipping_address || "742 Evergreen Terrace",
      city: orderPayload.city || "New York",
      postal_code: orderPayload.postal_code || "10001",
      items_json: JSON.stringify(orderPayload.items || []),
      subtotal: orderPayload.subtotal,
      discount: orderPayload.discount,
      delivery_fee: orderPayload.delivery_fee,
      total_amount: orderPayload.total_amount,
      payment_method: orderPayload.payment_method || "CREDIT_CARD",
      status: "CONFIRMED",
      created_at: new Date().toISOString()
    };

    localOrders.unshift(newOrder);
    saveState('orders', localOrders);
    return newOrder;
  },

  async getTestimonials() {
    try {
      const res = await fetch(`${API_BASE}/testimonials/`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }
    return INITIAL_TESTIMONIALS;
  }
};

export const fallbackProducts = INITIAL_PRODUCTS.map((p) => ({
  ...p,
  name: p.title,
  image: p.main_image,
  sizes: p.sizes_csv ? p.sizes_csv.split(',') : ['Small', 'Medium', 'Large', 'X-Large'],
  colors: p.colors_csv ? p.colors_csv.split(',') : ['#4F4631', '#314F4A', '#31344F'],
  reviews_count: p.review_count || 48
}));

export const fetchProducts = async (params) => {
  const data = await api.getProducts(params);
  return data.map((p) => ({
    ...p,
    name: p.title || p.name,
    image: p.main_image || p.image,
    sizes: p.sizes_csv ? p.sizes_csv.split(',') : (p.sizes || ['Small', 'Medium', 'Large', 'X-Large']),
    colors: p.colors_csv ? p.colors_csv.split(',') : (p.colors || ['#4F4631', '#314F4A', '#31344F']),
    reviews_count: p.review_count || p.reviews_count || 48
  }));
};

export const fetchCategories = async () => {
  return ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
};

export const fetchTestimonials = async () => {
  return await api.getTestimonials();
};

export default api;
