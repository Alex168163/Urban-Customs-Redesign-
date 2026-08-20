export type Review = {
  name: string;
  quote: string;
  /** Short tag used for placing a review beside the section it proves. */
  topic: "flooring" | "refinishing" | "vinyl" | "stone" | "kitchen" | "general";
};

/**
 * Reproduced verbatim from the client's published testimonials.
 * Never edit a review. Ordered most-specific first — specificity persuades.
 */
export const reviews: Review[] = [
  {
    name: "Eric B.",
    topic: "flooring",
    quote:
      "We had our main done with all wood floors and our master bath tile done. Urban Customs did a spectacular job. Steve our PM had everything scheduled perfectly and our house was put back the way we left it. They stayed on budget and kept us fully informed daily. Couldn't be happier with the results.",
  },
  {
    name: "Adam B.",
    topic: "refinishing",
    quote:
      "I couldn't be happier with our experience with Heath and Urban Customs. We had 18 year old bamboo floors that I thought were almost irreparable. However, Heath was able to restore the floors to perfection! Heath was extremely professional and easy to work with. I highly recommend Urban Customs!",
  },
  {
    name: "Laurie S.",
    topic: "flooring",
    quote:
      "Rachel and Heath were amazing to work with. From the initial call to the final completion of my beautiful floor, they were so helpful and professional. Rachel searched for the exact flooring that I wanted even though they didn't carry it and Heath installed it flawlessly! They are both great to work with and very friendly and kind. I highly recommend working with Urban Customs!",
  },
  {
    name: "Taylor T.",
    topic: "general",
    quote:
      "We had a great experience working with Urban Customs. Heath and Rachel were very responsive and worked with us on the detailing of our stairs to make sure we had a desirable and cost-effective finished product. Heath was very easy to work with and efficient with the install. He left the house in a clean and livable condition at the end of each day. We are very happy with the process and final product.",
  },
  {
    name: "Amber B.",
    topic: "stone",
    quote:
      "Heath and his team did an exceptional job on our tile. I had a vision of what we wanted, and he was able to make it happen. It's light and bright like I wanted and It makes the house look open and larger now. I can say enough good things about this company. They just really know tile and how to lay it properly. Thanks so much!",
  },
  {
    name: "Krystle G.",
    topic: "flooring",
    quote:
      "Urban customs did a fantastic job with our flooring. We had Eucalyptus hardwood installed throughout the house and new tiling in the kitchen. Heath and his team were quick and professional. They were great with communication and customer service. We plan to hire again for additional home renovations.",
  },
  {
    name: "Haylee H.",
    topic: "vinyl",
    quote:
      "We are so pleased with Urban Customs! Heath helped us choose the perfect vinyl flooring for our dining room, kitchen & family room (all connected). We discussed our vision, lifestyle and budget — and got better than we hoped for. The team was quick with installation and the finished product is perfect. We will definitely work with UC in the future.",
  },
  {
    name: "Sandy S.",
    topic: "kitchen",
    quote:
      "We've had Urban Customs do 2 remodels for us. Heath and Rachel are super helpful when doing design and picking out finishes. They are very knowledgeable about plumbing, electrical and how things should function properly. They come when they say they'll be there and are polite and friendly. If we need any more remodeling done they will the company we call.",
  },
  {
    name: "Dallas L.",
    topic: "kitchen",
    quote:
      "The workmanship is high-quality. They delivered on what they said they were going to do. Heath, is extremely easy to work with and came up with some great ideas. They also did a remodel on another home. Kitchen, bathroom and family room and it was a phenomenal job. I would definitely recommend and use them again.",
  },
  {
    name: "Evette M.",
    topic: "general",
    quote:
      "Working with Urban Customs was a dream. They started and ended, on time. Cleaned up after themselves. They exceeded our expectations. Working together, the end product was better than I thought it would be. I will call them again for our next renovation.",
  },
];

export const byName = (name: string): Review =>
  reviews.find((r) => r.name === name) ?? reviews[0];
