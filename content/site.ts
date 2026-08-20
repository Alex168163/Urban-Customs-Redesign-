/**
 * Single source of truth for name, address, phone, hours and license number.
 * Nothing hardcodes a phone number in JSX. Change it here, it changes everywhere.
 */

export const site = {
  name: "Urban Customs",
  legalName: "Urban Customs LLC",
  tagline: "Flooring and kitchen contractors serving the Phoenix Valley.",

  // Confirmed against the agency staging redesign, which uses this address
  // consistently on every page. CONFIRM VERBALLY WITH THE CLIENT BEFORE LAUNCH.
  address: {
    street: "1718 E. McDowell Rd. Unit 18",
    city: "Phoenix",
    state: "AZ",
    stateLong: "Arizona",
    zip: "85006",
    note: "By appointment only",
  },

  phone: { display: "480-747-2516", href: "tel:+14807472516" },
  text: { display: "480-381-9892", href: "sms:+14803819892" },
  email: "info@urbancustomsaz.com",

  roc: "ROC# 293305",
  foundedYear: 2005,
  yearsInBusiness: 21,

  hours: {
    weekday: "Monday – Friday, 8:00am – 6:00pm",
    weekend: "Saturday & Sunday by appointment",
    schema: ["Mo-Fr 08:00-18:00"],
  },

  serviceAreas: [
    "Phoenix",
    "Gilbert",
    "Glendale",
    "Peoria",
    "Tempe",
    "Surprise",
    "Sun City",
    "Litchfield Park",
  ],

  reviewsUrl: "https://www.google.com/search?q=Urban+Customs+Phoenix+AZ+reviews",
  financingUrl: "https://hellorates.com/financing/urban-customs/",

  // Update to the production domain at launch.
  url: "https://urbancustomsaz.com",
} as const;

export const addressLine = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

export const nav = [
  { label: "Flooring", href: "/flooring" },
  { label: "Kitchens", href: "/kitchens" },
  { label: "Our Work", href: "/our-work" },
  { label: "Contact", href: "/contact" },
] as const;

export const projectTypes = [
  "Floor Installation",
  "Floor Refinishing",
  "Floor Repair",
  "Kitchen Remodeling",
  "Cabinet Installation",
  "Something Else",
] as const;

export const hearAboutOptions = [
  "Google Search",
  "Repeat Customer",
  "Referral",
  "Other",
] as const;
