export const galleryCategories = [
  "All",
  "Living Room",
  "Kitchen",
  "Master Bath",
  "Guest Bath",
  "Shower Stall",
  "Outdoor Patio",
  "Refinishing & Repair",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type Photo = {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "All">;
};

/**
 * Alt text describes what is actually in each frame — written from the photos,
 * not from the filenames.
 */
export const gallery: Photo[] = [
  { src: "/assets/gallery/pic001-with-logo.jpg", category: "Living Room", alt: "Red-toned parquet hardwood floor laid in a living room with an arched stone fireplace" },
  { src: "/assets/gallery/pic002-with-logo.jpg", category: "Living Room", alt: "Wide-plank hardwood running through a dining room toward open French doors" },
  { src: "/assets/gallery/pic003-with-logo.jpg", category: "Master Bath", alt: "Master bathroom with a marble double vanity, framed mirrors and tile floor" },
  { src: "/assets/gallery/pic004-with-logo.jpg", category: "Living Room", alt: "Light travertine floor tile meeting dark stained cabinetry at a doorway" },
  { src: "/assets/gallery/pic005-with-logo.jpg", category: "Kitchen", alt: "Kitchen with a granite-topped island, bar stools and tile floor" },
  { src: "/assets/gallery/pic006-with-logo.jpg", category: "Shower Stall", alt: "Walk-in shower tiled in wood-grain porcelain with a mosaic accent column" },
  { src: "/assets/gallery/pic007-with-logo.jpg", category: "Master Bath", alt: "Freestanding soaking tub set on large-format grey tile" },
  { src: "/assets/gallery/pic008-with-logo.jpg", category: "Master Bath", alt: "Slate mosaic floor in charcoal and blue against a marbled stone wall" },
  { src: "/assets/gallery/pic009-with-logo.jpg", category: "Kitchen", alt: "Hand-painted patterned tile backsplash behind a stainless gas range" },
  { src: "/assets/gallery/pic010-with-logo.jpg", category: "Living Room", alt: "Large-format travertine tile floor running down a hallway" },
  { src: "/assets/gallery/pic011-with-logo.jpg", category: "Living Room", alt: "Dark hardwood plank floor in a newly finished empty room" },
  { src: "/assets/gallery/pic012-with-logo.jpg", category: "Living Room", alt: "Golden parquet basketweave hardwood floor, freshly finished" },
  { src: "/assets/gallery/pic013-with-logo.jpg", category: "Living Room", alt: "Dark hardwood meeting a stone tile step in a clean transition detail" },
  { src: "/assets/gallery/pic014-with-logo.jpg", category: "Guest Bath", alt: "Patterned encaustic-look tile surrounding a guest bathroom tub" },
  { src: "/assets/gallery/pic015-with-logo.jpg", category: "Living Room", alt: "Multi-tone slate floor tile finished against a stained wood baseboard" },
  { src: "/assets/gallery/pic016-with-logo.jpg", category: "Kitchen", alt: "Cherry cabinet kitchen with granite counters and a slate tile backsplash" },
  { src: "/assets/gallery/pic017-with-logo.jpg", category: "Master Bath", alt: "Soaking tub against a blue and white patterned tile wall" },
  { src: "/assets/gallery/pic018-with-logo.jpg", category: "Shower Stall", alt: "Travertine shower with a glass bubble mosaic accent stripe and built-in niche" },
  { src: "/assets/gallery/pic019-with-logo.jpg", category: "Guest Bath", alt: "Vessel sink vanity with a glass and stone mosaic backsplash" },
  { src: "/assets/gallery/pic020-with-logo.jpg", category: "Living Room", alt: "Close view of wide-plank hardwood with heavy grain and a matte finish" },
  { src: "/assets/gallery/pic021-with-logo.jpg", category: "Living Room", alt: "Pale hardwood floor set against dark stained built-in cabinetry" },
  { src: "/assets/gallery/pic022-with-logo.jpg", category: "Living Room", alt: "Wood-look plank flooring running under a bed in a finished bedroom" },
  { src: "/assets/gallery/pic023-with-logo.jpg", category: "Living Room", alt: "Hardwood meeting travertine tile on a diagonal transition line" },
  { src: "/assets/gallery/pic024-with-logo.jpg", category: "Kitchen", alt: "White shaker kitchen with black counters, subway backsplash and an island" },
  { src: "/assets/gallery/pic025-with-logo.jpg", category: "Kitchen", alt: "Speckled granite countertop with an undermount sink and pull-down faucet" },
  { src: "/assets/gallery/pic026-with-logo.jpg", category: "Kitchen", alt: "Dark cherry cabinet run under a granite counter and window" },
  { src: "/assets/gallery/pic027-with-logo.jpg", category: "Kitchen", alt: "Cherry kitchen with a granite island, pot rack and tile backsplash" },
  { src: "/assets/gallery/pic028-with-logo.jpg", category: "Shower Stall", alt: "Newly tiled shower pan in stone mosaic with a centered drain" },
  { src: "/assets/gallery/pic030-with-logo.jpg", category: "Master Bath", alt: "Master bath with a double wood vanity, tub deck and desert window view" },
  { src: "/assets/gallery/pic031-with-logo.jpg", category: "Master Bath", alt: "Drop-in soaking tub set into a tiled deck beneath a picture window" },
  { src: "/assets/gallery/pic032-with-logo.jpg", category: "Shower Stall", alt: "Tiled shower with a mosaic accent band and recessed shampoo niche" },
  { src: "/assets/gallery/pic033-with-logo.jpg", category: "Shower Stall", alt: "Stone tile shower with a rain head, mosaic band and built-in niche" },
  { src: "/assets/gallery/pic035-with-logo.jpg", category: "Refinishing & Repair", alt: "Refinished hardwood floor reflecting light through a leaded glass entry door" },
  { src: "/assets/gallery/pic036-with-logo.jpg", category: "Living Room", alt: "Bamboo stair landing with inset metal strips and a steel rail" },

  { src: "/assets/staging/living-room-stone-tile-flooring-by-urban-customs.jpg", category: "Living Room", alt: "Polished stone tile floor stepping down into a sunken living room" },
  { src: "/assets/staging/kitchen-stone-tile-flooring-by-urban-customs.jpg", category: "Kitchen", alt: "Stone tile kitchen floor under a granite island with bar seating" },
  { src: "/assets/staging/master-bathroom-stone-tile-flooring-by-urban-customs.jpg", category: "Master Bath", alt: "Charcoal stone mosaic floor in a master bathroom" },
  { src: "/assets/staging/guest-bathroom-stone-tile-flooring-by-urban-customs.jpg", category: "Guest Bath", alt: "Guest bathroom stone tile floor beside a freestanding tub" },
  { src: "/assets/staging/shower-stone-tile-flooring-by-urban-customs.jpg", category: "Shower Stall", alt: "Shower stall in wood-grain stone tile with a mosaic accent column" },
  { src: "/assets/staging/outdoor-stone-tile-flooring-by-urban-customs.jpg", category: "Outdoor Patio", alt: "Sand-toned stone paving laid across a covered outdoor patio" },
  { src: "/assets/staging/bamboo-flooring-by-urban-customs.jpg", category: "Living Room", alt: "Cali Bamboo flooring on a staircase landing beside a full-height window" },
  { src: "/assets/staging/hardwood-flooring-by-urban-customs-in-az.jpg", category: "Living Room", alt: "Warm hardwood floor running from an entry through to the next room" },
  { src: "/assets/staging/cabinet-installations-by-urban-customs.jpg", category: "Kitchen", alt: "Cream cabinet kitchen with a mosaic backsplash and speckled granite counters" },

  { src: "/assets/images/phoenix-flooring-installations-before-image.jpg", category: "Refinishing & Repair", alt: "Before: old carpet and pad pulled back at the edge of a room" },
  { src: "/assets/images/phoenix-flooring-installations-during-image.jpg", category: "Refinishing & Repair", alt: "During: hardwood planks going down over a prepped subfloor" },
  { src: "/assets/images/phoenix-flooring-installations-after-image.jpg", category: "Refinishing & Repair", alt: "After: the finished hardwood floor running wall to wall in the same room" },
  { src: "/assets/staging/urban-customs-floor-designs-and-installations-img-04.jpg", category: "Refinishing & Repair", alt: "Hexagon stone tile woven into an existing hardwood floor in a defined random pattern" },
];

/** The four-frame custom design case study, in sequence. */
export const caseStudyImages: Photo[] = [
  { src: "/assets/staging/urban-customs-floor-designs-and-installations-img-01.jpg", category: "Refinishing & Repair", alt: "The damaged run opened up — hardwood cut back to bare slab where the leak reached" },
  { src: "/assets/staging/urban-customs-floor-designs-and-installations-img-02.jpg", category: "Refinishing & Repair", alt: "Hexagon tile dry-laid across the opened area to set the pattern before bonding" },
  { src: "/assets/staging/urban-customs-floor-designs-and-installations-img-03.jpg", category: "Refinishing & Repair", alt: "Water-jet-cut stone hexagons feathered outward into the surrounding wood" },
  { src: "/assets/staging/urban-customs-floor-designs-and-installations-img-04.jpg", category: "Refinishing & Repair", alt: "The finished floor — tile scattering into hardwood so the repair reads as a design" },
];

/** Kitchen project photos, used on /kitchens/. */
export const kitchenGallery: Photo[] = [
  { src: "/assets/kitchen/arizona-kitchen-remodeling-by-urban-customs-img-001.jpg", category: "Kitchen", alt: "Open kitchen with white uppers, a dark island and pendant lighting over the counter" },
  { src: "/assets/kitchen/arizona-kitchen-remodeling-by-urban-customs-img-002.jpg", category: "Kitchen", alt: "White kitchen with a granite island, brick backsplash and open shelving" },
  { src: "/assets/kitchen/arizona-kitchen-remodeling-by-urban-customs-img-003.jpg", category: "Kitchen", alt: "Built-in beverage bar with a granite top, wine fridge and floating walnut shelves" },
  { src: "/assets/kitchen/arizona-kitchen-remodeling-by-urban-customs-img-004.jpg", category: "Kitchen", alt: "Navy shaker cabinets with a stacked grey tile backsplash and quartz counters" },
  { src: "/assets/kitchen/arizona-kitchen-remodeling-by-urban-customs-img-005.jpg", category: "Kitchen", alt: "Charcoal and white kitchen with a long quartz peninsula" },
  { src: "/assets/kitchen/arizona-kitchen-remodeling-by-urban-customs-img-006.jpg", category: "Kitchen", alt: "Range wall with a hand-painted tile inset above a stainless slide-in range" },
  { src: "/assets/kitchen/arizona-kitchen-remodeling-by-urban-customs-img-007.jpg", category: "Kitchen", alt: "White cabinets against a bronze brick backsplash with black counters and plank floor" },
  { src: "/assets/kitchen/arizona-kitchen-remodeling-by-urban-customs-img-008.jpg", category: "Kitchen", alt: "Full kitchen remodel with a white island, black counters and wood-look plank flooring" },
  { src: "/assets/kitchen/arizona-kitchen-remodeling-by-urban-customs-img-009.jpg", category: "Kitchen", alt: "Cabinet run framing a stainless range under a pressed-tin style backsplash" },
  { src: "/assets/kitchen/arizona-kitchen-remodeling-by-urban-customs-img-010.jpg", category: "Kitchen", alt: "Stainless range and hood set into an embossed metallic tile backsplash" },
  { src: "/assets/staging/kitchen-remodeling-by-urban-customs-az-img-009.jpg", category: "Kitchen", alt: "Double wall ovens and a coffee station built into a white cabinet wall" },
  { src: "/assets/staging/kitchen-remodeling-in-az.jpg", category: "Kitchen", alt: "Blue-grey island with turned legs beneath a bold patterned tile backsplash" },
];
