/**
 * All service copy. Pulled from docs/COPY-DECK.md. Declarative voice only —
 * no conditional openers, no keyword lists.
 */

export type FlooringSection = {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  image?: { src: string; alt: string };
  /** Rendered as a spec table beneath the body. */
  specs?: { label: string; value: string }[];
  /** Only present on services that exist on the staging site alone. */
  unconfirmed?: boolean;
};

export const homeServices = [
  {
    title: "Flooring installation",
    href: "/flooring#installation",
    linkLabel: "See our flooring work",
    body: "Hardwood, natural stone, tile, bamboo, and engineered flooring for homes and commercial properties. New floors raise how a home feels and what it is worth.",
    image: {
      src: "/assets/staging/hardwood-flooring-by-urban-customs-in-az.jpg",
      alt: "Warm hardwood floor running from an entry through to the next room",
    },
  },
  {
    title: "Refinishing & repair",
    href: "/flooring#refinishing",
    linkLabel: "See refinishing and repair",
    body: "Buffing, screening, sanding, resurfacing, and re-coating. We fix water damage, termite damage, deep scratches, worn areas, gaps, and cracks — most floors do not need replacing.",
    image: {
      src: "/assets/images/phoenix-flooring-installations-during-image.jpg",
      alt: "Hardwood planks going back down over a prepped subfloor mid-repair",
    },
  },
  {
    title: "Kitchens & cabinets",
    href: "/kitchens",
    linkLabel: "See kitchen remodels",
    body: "Cabinet installation, countertops, tile, backsplashes, and full kitchen redesigns, from first drawing to final walkthrough.",
    image: {
      src: "/assets/kitchen/arizona-kitchen-remodeling-by-urban-customs-img-008.jpg",
      alt: "Full kitchen remodel with a white island, black counters and wood-look plank flooring",
    },
  },
] as const;

export const whyUs = [
  {
    title: "Design",
    body: "We turn your ideas into a room that works. Our design team plans the space, the material, and the finish with you before a single box is opened.",
  },
  {
    title: "Installation",
    body: "Our installers are trained, licensed, and courteous in your home. We handle the job from first measurement to final baseboard.",
  },
  {
    title: "Warranty",
    body: "Every install comes with a transferable lifetime workmanship guarantee, plus the manufacturer's warranty on the material itself.",
  },
  {
    title: "Family-run",
    body: "Two decades of family tradition in Phoenix home improvement. We treat every job as another chance to make someone love their home more.",
  },
] as const;

export const trustPoints = [
  "21 years in the Valley",
  "ROC# 293305",
  "Lifetime workmanship guarantee",
  "Cali Bamboo preferred installer",
  "Financing available",
] as const;

export const offers = [
  {
    title: "Design consultation",
    image: "/assets/coupons/urban-customs-design-coupon-2026.jpg",
    alt: "Urban Customs 2026 design consultation coupon",
  },
  {
    title: "Installation",
    image: "/assets/coupons/urban-customs-installation-coupon-2026.jpg",
    alt: "Urban Customs 2026 installation coupon",
  },
  {
    title: "Free shipping",
    image: "/assets/coupons/urban-customs-free-shipping-coupon-2026.jpg",
    alt: "Urban Customs 2026 free shipping coupon",
  },
] as const;

export const flooringSections: FlooringSection[] = [
  {
    id: "installation",
    eyebrow: "Installation",
    title: "We install every major flooring type across the Valley",
    body: [
      "We install every major flooring type for residential and commercial properties across the Phoenix Valley. A new floor changes how a home feels and adds real value to it. We handle the full job — removal of the old floor, subfloor prep, installation, baseboards, and cleanup.",
      "Carpet and pad we remove goes to a recycling center, not a landfill.",
    ],
    image: {
      src: "/assets/staging/professional-flooring-contractors-in-az.jpg",
      alt: "Contemporary kitchen with a dark island set on continuous stone flooring",
    },
    specs: [
      { label: "Materials", value: "Wood, stone, tile, bamboo, engineered, laminate, luxury vinyl plank" },
      { label: "Rooms", value: "Shower floors, kitchens, master and guest baths, living rooms, patio stone" },
      { label: "Scope", value: "Tear-out, subfloor prep, install, baseboards, cleanup" },
    ],
  },
  {
    id: "hardwood",
    eyebrow: "Material",
    title: "Hardwood",
    body: [
      "Hardwood flooring is cut from solid wood start to finish. It brings warmth and durability, and it holds its value — a hardwood floor can be refinished decades after it is laid rather than replaced. It suits both homes and offices, and our team helps you match species and finish to how the room actually gets used.",
    ],
    image: {
      src: "/assets/gallery/pic020-with-logo.jpg",
      alt: "Close view of wide-plank hardwood with heavy grain and a matte finish",
    },
  },
  {
    id: "stone",
    eyebrow: "Material",
    title: "Natural stone & tile",
    body: [
      "We install natural stone and tile for homes and commercial properties throughout the Valley. Tile is the strongest performer in Arizona: it stays cool through the summer and stands up to the heat.",
    ],
    image: {
      src: "/assets/staging/stone-floor-installation-services-in-arizona.jpg",
      alt: "Large-format stone tile floor running through a bright hallway",
    },
    specs: [
      { label: "Tile sizes", value: "8×8, 8×16, 12×12, 12×24, 16×16, 16×24, 18×18" },
      { label: "Natural stone", value: "Soapstone, slate, travertine, limestone, marble, granite" },
    ],
  },
  {
    id: "bamboo",
    eyebrow: "Material",
    title: "Bamboo",
    body: [
      "We install the World's Hardest Floors™ Cali Bamboo. Its Fossilized® manufacturing makes it roughly twice as hard as standard hardwood, and it carries a 50-year residential warranty. Urban Customs is a preferred Cali Bamboo installer and has laid it in homes across Phoenix.",
    ],
    image: {
      src: "/assets/staging/bamboo-flooring-by-urban-customs.jpg",
      alt: "Cali Bamboo flooring on a staircase landing beside a full-height window",
    },
    specs: [
      { label: "Hardness", value: "Roughly 2× standard hardwood" },
      { label: "Warranty", value: "50-year residential" },
    ],
  },
  {
    id: "laminate",
    eyebrow: "Material",
    title: "Laminate",
    unconfirmed: true,
    body: [
      "Laminate gives you the look of wood at a lower cost and stands up to heavy traffic, pets, and kids. It suits rental properties, basements, and any room that takes a beating.",
    ],
    image: {
      src: "/assets/staging/laminate-flooring-services-in-phoenix-az.jpg",
      alt: "Pale laminate plank flooring catching sunlight beside a sheer curtain",
    },
  },
  {
    id: "vinyl-plank",
    eyebrow: "Material",
    title: "Luxury vinyl plank",
    unconfirmed: true,
    body: [
      "Luxury vinyl plank is waterproof, warm underfoot, and quiet. It goes anywhere wood cannot — bathrooms, laundry rooms, kitchens — and it looks the same across all of them, so open-plan spaces read as one floor.",
    ],
    image: {
      src: "/assets/gallery/pic022-with-logo.jpg",
      alt: "Wood-look plank flooring running under a bed in a finished bedroom",
    },
  },
  {
    id: "refinishing",
    eyebrow: "Service",
    title: "Refinishing",
    body: [
      "Most flooring contractors do not refinish. We do, because the company that installed your floor should be the one that maintains it. Our refinishing covers buffing, screening, sanding, resurfacing, re-coating, and full refinishing — bringing a worn floor back without replacing it.",
    ],
    image: {
      src: "/assets/gallery/pic012-with-logo.jpg",
      alt: "Golden parquet basketweave hardwood floor, freshly finished",
    },
  },
  {
    id: "sanding",
    eyebrow: "Service",
    title: "Floor sanding",
    unconfirmed: true,
    body: [
      "We sand hardwood floors flat, removing old finish, surface damage, and the ridges left by previous refinishes. Sanding is the step that makes the difference between a floor that looks resurfaced and one that looks new.",
    ],
    image: {
      src: "/assets/images/Hardwood-Floor-Refinishing-Phoenix-AZ.jpg",
      alt: "Hardwood floor mid-refinish, sanded back to bare wood",
    },
  },
  {
    id: "repair",
    eyebrow: "Service",
    title: "Repair & restoration",
    body: [
      "We restore hardwood damaged by water, termites, deep scratches, worn traffic paths, gaps, cracks, crayon, and paint. Bring us the floor before you decide to replace it — repair is usually the cheaper answer.",
    ],
    image: {
      src: "/assets/images/phoenix-flooring-installations-during-image.jpg",
      alt: "Hardwood planks going down over a prepped subfloor during a repair",
    },
  },
  {
    id: "warranty",
    eyebrow: "Guarantee",
    title: "Lifetime workmanship guarantee",
    body: [
      "Our workmanship carries a lifetime guarantee, and every material we install carries the manufacturer's warranty. We explain both in plain terms and show you how to care for the floor. One call brings us back out.",
      "Anything that goes wrong, we come back and fix it. That is what the lifetime workmanship guarantee means.",
    ],
    specs: [
      { label: "Workmanship", value: "Lifetime, transferable to the next owner" },
      { label: "Material", value: "Manufacturer warranty, explained in plain terms" },
      { label: "License", value: "ROC# 293305" },
    ],
  },
];

export const kitchenServices = [
  {
    title: "Kitchen design",
    body: "Every remodel starts with your needs, your wants, and your budget, in your kitchen. Our design team works through the functional problems in the room you have now and shows you how the new one solves them.",
    image: {
      src: "/assets/images/the-urban-customs-kitchen-remodeling-process.jpg",
      alt: "Kitchen plans, cabinet door samples, stone chips and paint fans laid out on a counter",
    },
  },
  {
    title: "Cabinet installation",
    body: "We pull the old cabinetry and set new cabinets built to your kitchen. Our team works to keep your kitchen usable and the job moving. Everything still usable that comes out is donated to a resale charity.",
    image: {
      src: "/assets/staging/cabinet-installations-by-urban-customs.jpg",
      alt: "Cream cabinet kitchen with a mosaic backsplash and speckled granite counters",
    },
  },
  {
    title: "Kitchen remodel ideas",
    body: "We guide the whole decision — space planning, cabinet layout, color, appliance upgrades, lighting, and finishes. You decide how the kitchen should look; we make it work.",
    image: {
      src: "/assets/staging/kitchen-remodeling-in-az.jpg",
      alt: "Blue-grey island with turned legs beneath a bold patterned tile backsplash",
    },
  },
] as const;

export const kitchenProcess = [
  {
    step: "01",
    title: "Consultation",
    body: "A short call to understand what you want and what you have budgeted.",
  },
  {
    step: "02",
    title: "Planning and design",
    body: "Anything from a straightforward cabinet order to a full design consultation.",
  },
  {
    step: "03",
    title: "Finalize the details",
    body: "Kitchens have a lot of moving parts. We make sure every element works with the others before anything is ordered.",
  },
  {
    step: "04",
    title: "Remodeling",
    body: "Work starts once every piece is on site and correct, which is how we hold to a schedule. We keep you posted throughout and work to keep your home livable.",
  },
] as const;
