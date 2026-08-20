# Urban Customs — Copy Deck

All site copy. The build agent pulls from this file and does not write original marketing copy.

---

## 1. Voice rules

**Declarative, not conditional.** State what the company does. Do not ask the reader to self-qualify.

| Do | Do not |
|---|---|
| "We refinish hardwood floors across the Phoenix Valley." | "If your floors need refinishing…" |
| "Urban Customs installs hardwood, tile, stone, and bamboo." | "If you are searching for flooring contractors…" |
| "We repair water damage, deep scratches, and worn areas." | "If your hardwood flooring is in bad shape…" |

**Banned constructions.** Zero instances allowed anywhere in the build:

- `If you are searching for…`
- `If you need…`
- `If your…`
- `If you're looking for…`
- `…can help!`
- `Should you require…`
- Any sentence opening with a conditional clause about the customer's situation

**Also banned:** keyword-stuffed sentences. The current homepage line beginning "Popular search queries used to find our flooring installation services include…" is deleted outright and not replaced.

**Second person, active voice.** "We install your floor." Not "flooring installation services are provided."

**Specifics over adjectives.** "50-year warranty on Cali Bamboo" beats "exceptional quality." Numbers, materials, warranties, and years are what convert. The company has real ones — use them.

---

## 2. Rewrite table — every "if" on the current site

| Page | Original | Rewrite |
|---|---|---|
| Home | "If you are searching for 'Flooring Contractors Near Me', 'Flooring Contractors Phoenix'… Urban Customs can help!" | "Urban Customs installs hardwood, tile, stone, and bamboo flooring throughout the Phoenix Valley — Phoenix, Gilbert, Glendale, Peoria, Tempe, and everywhere across the Valley of the Sun. Call 480-747-2516 for a free estimate." |
| Home | "If you hardwood flooring is in bad shape, we provide hardwood flooring repair to help fix water damage, crayon marks, paint spills and more." | "We repair hardwood floors damaged by water, crayon, paint spills, and daily wear — and bring them back to the finish they started with." |
| Flooring | "If you are searching 'flooring installation', 'flooring installation near me', 'certified flooring installers'… Urban Customs can help!" | "Urban Customs is a licensed flooring installation contractor serving Phoenix, Glendale, Peoria, Surprise, and the wider Valley. ROC# 293305." |
| Kitchens | "If you are searching for 'Kitchen Remodeling Near Me', 'Kitchen Remodeling Companies'… Urban Customs can help!" | "Urban Customs remodels kitchens across the Phoenix Valley — cabinets, countertops, tile, and full redesigns. Call 480-747-2516 for a free remodeling estimate." |
| Flooring | "Although, choosing the right type of flooring for your home or office can be difficult… However, we are always here to help you find the best type of flooring for your individual needs." | "Our team walks you through the options in person, matches the material to how the room actually gets used, and gives you a written quote before anything is ordered." |
| Flooring | "Should your flooring ever have issues, we are only a call away to solve any problems." | "Every install carries a lifetime workmanship guarantee. One call brings us back out." |

### Additional "if" clauses found on the agency staging site

The staging redesign carried these over unchanged. They get the same treatment.

| Source | Original | Rewrite |
|---|---|---|
| Staging home | "If you are searching for 'Flooring Contractors Near Me'… Urban Customs can help! … Popular search queries used to find our flooring installation services include: flooring contractors near me, flooring contractors Phoenix AZ…" | "Urban Customs installs and restores floors across the Phoenix Valley — hardwood, tile, stone, bamboo, laminate, and luxury vinyl plank. Call 480-747-2516 for a free estimate." *(The keyword list is deleted, not rewritten.)* |
| Staging services | "If anything ever does go wrong, we will be there to solve any issues." | "Anything that goes wrong, we come back and fix it. That is what the lifetime workmanship guarantee means." |
| Staging services | "Want to receive a custom flooring estimate from one of our expert installation contractors? Feel free to give us a call today…" | "Get a custom flooring estimate from one of our installers. Call 480-747-2516." |
| Staging services | "We can help with any hardwood flooring and natural tile flooring installations, repairs, restorations or refinishing in Phoenix, Glendale, Peoria, Surprise…" | "We install, repair, restore, and refinish hardwood and natural tile flooring in Phoenix, Glendale, Peoria, Surprise, and Valley wide." |

Note "Feel free to" and "Want to receive…?" alongside the conditionals — both are hedges that ask permission to sell. Cut them the same way.

**Note for the build agent:** both source sites may contain additional conditional openers on pages not rebuilt in v1. The grep check in BUILD-GUIDE §10 is the backstop — run it against the finished build, not against this file.

---

## 3. Homepage

**Hero headline**
> Phoenix flooring and kitchen contractors, family-run for 21 years.

**Hero subhead**
> Hardwood, tile, stone, bamboo, refinishing, and full kitchen remodels across the Valley of the Sun. Every install carries a transferable lifetime workmanship guarantee.

**Hero form heading**
> Get a free estimate

**Hero form microcopy (under button)**
> Or call 480-747-2516. We answer Monday through Friday, 8am–6pm.

**Trust bar**
> 21 Years in the Valley · ROC# 293305 · Lifetime Workmanship Guarantee · Cali Bamboo Preferred Installer · Financing Available

**Services section heading**
> What we do

*Card 1 — Flooring Installation*
> Hardwood, natural stone, tile, bamboo, and engineered flooring for homes and commercial properties. New floors raise how a home feels and what it is worth.
> → See our flooring work

*Card 2 — Refinishing & Repair*
> Buffing, screening, sanding, resurfacing, and re-coating. We fix water damage, termite damage, deep scratches, worn areas, gaps, and cracks — most floors do not need replacing.
> → See refinishing and repair

*Card 3 — Kitchens & Cabinets*
> Cabinet installation, countertops, tile, backsplashes, and full kitchen redesigns, from first drawing to final walkthrough.
> → See kitchen remodels

**Financing block** *(from the staging site — currently buried on the live site)*
> **100% home improvement financing available.**
> Apply in 60 seconds. Multiple options.
> [Check my options →]

Place this directly under the offer strip. Financing removes the price objection before it forms, and it is the second-strongest conversion lever on the page after the form itself. Link to `hellorates.com/financing/urban-customs/`, `rel="noopener"`, opens in a new tab. Confirm the partnership is active first.

**Offer strip heading**
> Current specials

**Recent work heading**
> Recent projects in the Valley

**Reviews heading**
> What our customers say

**Why-us heading**
> Why homeowners pick Urban Customs

*Design*
> We turn your ideas into a room that works. Our design team plans the space, the material, and the finish with you before a single box is opened.

*Installation*
> Our installers are trained, licensed, and courteous in your home. We handle the job from first measurement to final baseboard.

*Warranty*
> Every install comes with a transferable lifetime workmanship guarantee, plus the manufacturer's warranty on the material itself.

*Family-run*
> Two decades of family tradition in Phoenix home improvement. We treat every job as another chance to make someone love their home more.

**Quote Rail**
> Ready for a new floor?
> Get a free, no-pressure estimate. Call 480-747-2516, text 480-381-9892, or send the form.

---

## 4. Flooring page

**Hero headline**
> Flooring installation, refinishing, and repair in Phoenix

**Hero subhead**
> Urban Customs is a licensed flooring contractor serving Phoenix, Glendale, Peoria, Surprise, Gilbert, and the wider Valley. ROC# 293305.

**#installation**
> We install every major flooring type for residential and commercial properties across the Phoenix Valley. A new floor changes how a home feels and adds real value to it. We handle the full job — removal of the old floor, subfloor prep, installation, baseboards, and cleanup.
>
> Carpet and pad we remove goes to a recycling center, not a landfill.

**#custom-design** — *the strongest content either site has. Put it high on the page.*

> **We design around problems other contractors replace.**
>
> A line leak behind a refrigerator damaged a section of wood floor. The style had been discontinued, and the homeowner wanted to keep it. Replacing the whole floor meant 2,700 square feet.
>
> Instead we laid a defined random pattern of tile through the damaged area with stone accent pieces water-jet cut to match the tile dimensions, then wove the original wood back into it. The repair reads as a design feature. The homeowner kept the floor they wanted and did not replace 2,700 feet of it.

Pair with the four `urban-customs-floor-designs-and-installations` images. Caption them as before / cut / weave / finished if the sequence supports it — verify against the actual images before writing captions.

**Materials we install** *(expanded from the staging site — confirm all are current)*

> Wood, stone, tile, bamboo, engineered, laminate, and luxury vinyl plank. Shower floors, kitchen floors, master and guest bathrooms, living rooms, and patio stone.

**#hardwood**
> Hardwood flooring is cut from solid wood start to finish. It brings warmth and durability, and it holds its value — a hardwood floor can be refinished decades after it is laid rather than replaced. It suits both homes and offices, and our team helps you match species and finish to how the room actually gets used.

**#stone**
> We install natural stone and tile for homes and commercial properties throughout the Valley. Tile is the strongest performer in Arizona: it stays cool through the summer and stands up to the heat.
>
> **Tile sizes:** 8×8, 8×16, 12×12, 12×24, 16×16, 16×24, 18×18, available in a range of patterns and shapes.
> **Natural stone:** soapstone, slate, travertine, limestone, marble, and granite.

**#bamboo**
> We install the World's Hardest Floors™ Cali Bamboo. Its Fossilized® manufacturing makes it roughly twice as hard as standard hardwood, and it carries a 50-year residential warranty. Urban Customs is a preferred Cali Bamboo installer and has laid it in homes across Phoenix.

**#laminate** *(new — staging only, confirm before publishing)*
> Laminate gives you the look of wood at a lower cost and stands up to heavy traffic, pets, and kids. It suits rental properties, basements, and any room that takes a beating.

**#vinyl-plank** *(new — staging only, confirm before publishing)*
> Luxury vinyl plank is waterproof, warm underfoot, and quiet. It goes anywhere wood cannot — bathrooms, laundry rooms, kitchens — and it looks the same across all of them, so open-plan spaces read as one floor.

**#sanding** *(new — staging only, confirm before publishing)*
> We sand hardwood floors flat, removing old finish, surface damage, and the ridges left by previous refinishes. Sanding is the step that makes the difference between a floor that looks resurfaced and one that looks new.

**#refinishing**
> Most flooring contractors do not refinish. We do, because the company that installed your floor should be the one that maintains it. Our refinishing covers buffing, screening, sanding, resurfacing, re-coating, and full refinishing — bringing a worn floor back without replacing it.

**#repair**
> We restore hardwood damaged by water, termites, deep scratches, worn traffic paths, gaps, cracks, crayon, and paint. Bring us the floor before you decide to replace it — repair is usually the cheaper answer.

**Design / Installation / Warranty blocks**

*Flooring design*
> Our designers and craftsmen take your idea and turn it into a finished floor — from subtle, quiet tones to expressive grain. We plan the living room, kitchen, bathroom, and office together so the house reads as one space.

*Flooring installation*
> Our installers have the training and the hands to match the floor to how you live. We run the job from design through installation, and we keep your home clean going in and coming out.

*Flooring warranties*
> Our workmanship carries a lifetime guarantee, and every material we install carries the manufacturer's warranty. We explain both in plain terms and show you how to care for the floor. One call brings us back out.

**Quote Rail**
> Get a free flooring estimate. Call 480-747-2516 or send the form and we will get back to you.

---

## 5. Kitchens page

**Hero headline**
> Kitchen remodeling in Phoenix, Arizona

**Hero subhead**
> Cabinets, countertops, tile, and full kitchen redesigns across the Valley. Call 480-747-2516 for a free remodeling estimate.

**Kitchen design**
> Every remodel starts with your needs, your wants, and your budget, in your kitchen. Our design team works through the functional problems in the room you have now and shows you how the new one solves them.

**Cabinet installation**
> We pull the old cabinetry and set new cabinets built to your kitchen. Our team works to keep your kitchen usable and the job moving. Everything still usable that comes out is donated to a resale charity.

**Kitchen remodel ideas**
> We guide the whole decision — space planning, cabinet layout, color, appliance upgrades, lighting, and finishes. You decide how the kitchen should look; we make it work.

**Process (real sequence — number these)**
> **1. Consultation** — A short call to understand what you want and what you have budgeted.
> **2. Planning and design** — Anything from a straightforward cabinet order to a full design consultation.
> **3. Finalize the details** — Kitchens have a lot of moving parts. We make sure every element works with the others before anything is ordered.
> **4. Remodeling** — Work starts once every piece is on site and correct, which is how we hold to a schedule. We keep you posted throughout and work to keep your home livable.

**Quote Rail**
> Get a free kitchen estimate. Call 480-747-2516 or send the form.

---

## 6. Our Work page

**Headline**
> Our work across the Valley

**Subhead**
> Floors, refinishing, and kitchens we have completed for Phoenix-area homeowners.

**Reviews heading**
> What our customers say

**Use the ten testimonials from the agency staging site.** They are newer than the seven on the live site, they name the people who do the work, and they describe specific outcomes.

Reproduce customer words verbatim. Never edit a review.

**Order them this way** — most specific first, because specificity is what persuades:

1. **Eric B.** — main floor in wood, master bath tile. Names Steve, their PM. On budget, informed daily, house left as found.
2. **Adam B.** — 18-year-old bamboo floors he thought were beyond saving; restored to perfection. *This is the single best review for the refinishing and restoration sections.*
3. **Laurie S.** — Rachel sourced flooring the company did not stock; Heath installed it. Helpful and professional start to finish.
4. **Taylor T.** — stair detailing worked through for a cost-effective result. House left clean and livable each day.
5. **Amber B.** — tile work matched a vision; room reads lighter and larger. Praises their tile-laying specifically.
6. **Krystle G.** — eucalyptus hardwood throughout plus kitchen tile. Quick, professional, strong communication.
7. **Haylee H.** — vinyl flooring across three connected rooms, chosen around lifestyle and budget. *Use this one in the vinyl plank section.*
8. **Sandy S.** — two remodels. Knowledgeable on plumbing, electrical, and how things should function. Shows up when they say.
9. **Dallas L.** — high-quality workmanship, delivered as promised, plus a second whole-home remodel.
10. **Evette M.** — started and ended on time, cleaned up, exceeded expectations.

**Placement beyond this page:**
- Adam B. → `/flooring/#refinishing` and `#repair`
- Haylee H. → `/flooring/#vinyl-plank`
- Amber B. → `/flooring/#stone`
- Sandy S. and Dallas L. → `/kitchens/`
- Eric B. and Laurie S. → homepage reviews band

Pull exact text from `https://webtechs-designs.com/UrbanCustoms/` (homepage reviews band) and `/testimonials/`.

**Two things to confirm with the client:** that these are real, attributable reviews, and whether they can be sourced from Google. Reviews pulled live from the Google Places API carry more weight than static text, and they update themselves.

The seven older testimonials on the live site (Andy D., Tom W., Barbi H., Susan P., Jan S., C.W., Mary Y.) can be kept in a "More reviews" expander. Andy D.'s is worth keeping regardless — it is the only one that mentions carpet and pad going to a recycling center rather than a landfill, which is a real differentiator the company otherwise never states.

---

## 7. Contact page

**Headline**
> Get your free estimate

**Subhead**
> Send the form and we will get back to you, or reach us directly. We serve Phoenix, Gilbert, Glendale, Peoria, Tempe, Surprise, Sun City, and the wider Valley of the Sun.

**Contact block**
> Phone: 480-747-2516
> Text: 480-381-9892
> Email: info@urbancustomsaz.com
> Hours: Monday–Friday, 8:00am–6:00pm. Saturday and Sunday by appointment.
> Address: [CLIENT-CONFIRMED ADDRESS] — by appointment only.
> ROC# 293305

---

## 8. Thank You page

**Headline**
> Thanks — we have your request.

**Body**
> A member of our team will get back to you shortly. For anything urgent, call 480-747-2516 and we will pick up during business hours.
>
> While you wait, take a look at recent projects across the Valley.
> → See our work

---

## 9. Footer

> **Urban Customs** — Flooring and kitchen contractors serving the Phoenix Valley.
> ROC# 293305
> [CLIENT-CONFIRMED ADDRESS] · By appointment only
> Monday–Friday 8:00am–6:00pm · Saturday and Sunday by appointment
> Phone 480-747-2516 · Text 480-381-9892 · info@urbancustomsaz.com
> Service areas: Phoenix · Gilbert · Glendale · Peoria · Tempe · Surprise · Sun City · Litchfield Park
> Careers: email info@urbancustomsaz.com
> © 2016–2026 Urban Customs. All rights reserved.
