export type Faq = { q: string; a: string };

/**
 * Answers are declarative. The live site's "IF I HAVE AN ISSUE WITH MY FLOOR"
 * question has been rewritten to drop the conditional opener.
 *
 * The 2019 cost figures from the old FAQ page are deliberately not carried
 * over — stale pricing published as current erodes trust. Add them back only
 * once the client confirms the numbers.
 */
export const flooringFaqs: Faq[] = [
  {
    q: "Where can I find pricing for my project?",
    a: "Pricing comes from the room itself, so we quote from real measurements. Send the form, call 480-747-2516, or message us and we will put a number to your project.",
  },
  {
    q: "Are there additional charges when we get an estimate?",
    a: "There are never any hidden fees when we quote out projects of any size. We take pride in always being honest and up-front with our clients.",
  },
  {
    q: "Can an engineered wood floor be refinished?",
    a: "Yes. In most cases an engineered floor can be refinished a few times, depending on the thickness of its wear layer.",
  },
  {
    q: "Can I change the color or finish of my current wood floor?",
    a: "Yes, we can change the color or finish of any solid wood floor. Sometimes even without the mess of sanding.",
  },
  {
    q: "Is a factory-finished floor or a site-finished floor better for me?",
    a: "Each method has its own benefits and advantages. The right one depends on how much customization you want and on your own preference, and we walk through both with you before anything is ordered.",
  },
  {
    q: "My floor develops a problem after the install. What happens then?",
    a: "Call us. Every install carries a transferable lifetime workmanship guarantee, and one call brings us back out to fix it.",
  },
  {
    q: "Do you remove the old flooring?",
    a: "Yes. We handle the full job — removal of the old floor, subfloor prep, installation, baseboards, and cleanup. Carpet and pad we remove goes to a recycling center, not a landfill.",
  },
  {
    q: "Which areas do you serve?",
    a: "Phoenix, Gilbert, Glendale, Peoria, Tempe, Surprise, Sun City, Litchfield Park, and the wider Valley of the Sun.",
  },
];

export const kitchenFaqs: Faq[] = [
  {
    q: "How long does a kitchen remodel take?",
    a: "The schedule depends on scope, and we give you one before work starts. Work begins once every piece is on site and correct, which is how we hold to that schedule.",
  },
  {
    q: "Can we still use the kitchen during the remodel?",
    a: "We work to keep your kitchen usable and your home livable while the job runs, and we keep you posted throughout.",
  },
  {
    q: "What happens to the old cabinets?",
    a: "Everything still usable that comes out is donated to a resale charity.",
  },
  {
    q: "Do you handle countertops and backsplash as well as cabinets?",
    a: "Yes. Cabinets, countertops, tile, backsplashes, lighting, and appliance planning are all part of the same job.",
  },
  {
    q: "Is financing available?",
    a: "Yes. 100% home improvement financing is available with multiple options, and the application takes about 60 seconds.",
  },
];
