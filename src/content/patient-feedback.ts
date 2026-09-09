import type { VerificationStatus } from "@/types/content";

// NOTE: the 105-scan full archive (feedback-archive-001..105.jpg) that used to
// back this page was pulled from public/ and quarantined at
// _unpublished-review/patient-feedback-archive-UNREVIEWED/ — a spot-check
// found several scans with unredacted patient names (one with an NHS number)
// despite captions claiming "personal details withheld". Do not re-add an
// import of patient-feedback-archive.generated.json or re-publish those
// files until every image has been individually reviewed and redacted.

export type FeedbackExcerpt = {
  quote: string;
  context: string;
  status: VerificationStatus;
};

export type FeedbackCardImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: "patient" | "professional";
  kind?: "card" | "note";
  className?: string;
  imageClassName?: string;
  status: VerificationStatus;
};

export const feedbackExcerpts: FeedbackExcerpt[] = [
  {
    quote: "You are an excellent team.",
    context: "Patient thank-you note, name withheld",
    status: "verified",
  },
  {
    quote: "My sincere thanks to you and your team.",
    context: "Patient card, name withheld",
    status: "verified",
  },
  {
    quote: "Your kindness, professionalism and empathy are exceptional.",
    context: "Family thank-you card, names withheld",
    status: "verified",
  },
  {
    quote: "Thank you for your help and for taking care of me.",
    context: "Patient note, name withheld",
    status: "verified",
  },
  {
    quote: "Thank you for looking after me during my surgery and aftercare.",
    context: "Patient card, name withheld",
    status: "verified",
  },
  {
    quote: "Heartfelt thanks and sincere gratitude.",
    context: "Family note, names withheld",
    status: "verified",
  },
];

export const feedbackArchiveImages: FeedbackCardImage[] = [
  {
    src: "/images/patient-feedback/patient-feedback-huge-thanks-card.jpg",
    alt: "Cropped thank-you card cover with floral pattern.",
    width: 819,
    height: 950,
    className: "md:col-span-2 md:row-span-2",
    imageClassName: "object-contain",
    status: "verified",
  },
  {
    src: "/images/patient-feedback/patient-feedback-excellent-team-note.jpg",
    alt: "Cropped handwritten patient note with identifying details removed.",
    width: 1100,
    height: 423,
    className: "md:col-span-2",
    imageClassName: "object-top",
    status: "verified",
  },
  {
    src: "/images/patient-feedback/patient-feedback-rainbow-card.jpg",
    alt: "Cropped thank-you card cover with rainbow illustration.",
    width: 1010,
    height: 1400,
    status: "verified",
  },
  {
    src: "/images/patient-feedback/patient-feedback-special-card.jpg",
    alt: "Cropped floral card cover reading for someone special.",
    width: 976,
    height: 1400,
    imageClassName: "object-bottom",
    status: "verified",
  },
  {
    src: "/images/patient-feedback/patient-feedback-roses-card.jpg",
    alt: "Cropped rose thank-you card cover.",
    width: 683,
    height: 950,
    status: "verified",
  },
  {
    src: "/images/patient-feedback/patient-feedback-sincere-thanks-note.jpg",
    alt: "Cropped handwritten patient card with identifying details removed.",
    width: 1100,
    height: 396,
    className: "md:col-span-2",
    imageClassName: "object-top",
    status: "verified",
  },
  {
    src: "/images/patient-feedback/patient-feedback-star-card.jpg",
    alt: "Cropped black and white thank-you card cover.",
    width: 858,
    height: 1000,
    status: "verified",
  },
  {
    src: "/images/patient-feedback/patient-feedback-script-thank-you-card.jpg",
    alt: "Cropped script thank-you card cover.",
    width: 894,
    height: 900,
    status: "verified",
  },
  {
    src: "/images/patient-feedback/patient-feedback-winter-card.jpg",
    alt: "Cropped winter thank-you card cover.",
    width: 508,
    height: 1300,
    status: "verified",
  },
  {
    src: "/images/patient-feedback/patient-feedback-pink-message-card.jpg",
    alt: "Cropped pink thank-you card cover.",
    width: 850,
    height: 1051,
    status: "verified",
  },
];

export const homepageFeedbackImages: FeedbackCardImage[] = [
  {
    ...feedbackArchiveImages[0]!,
    className: "col-span-2 aspect-[5/4] lg:col-span-2 lg:translate-y-8 lg:-rotate-2",
    imageClassName: "object-contain",
  },
  {
    ...feedbackArchiveImages[1]!,
    className: "col-span-2 aspect-[16/7] lg:col-span-1 lg:aspect-[4/5] lg:-translate-y-4 lg:rotate-2",
    imageClassName: "object-top",
  },
  {
    ...feedbackArchiveImages[2]!,
    className: "lg:translate-y-2 lg:rotate-1",
  },
  {
    ...feedbackArchiveImages[3]!,
    className: "lg:-rotate-1",
    imageClassName: "object-bottom",
  },
  {
    ...feedbackArchiveImages[4]!,
    className: "sm:col-span-2 lg:col-span-1 lg:translate-y-6 lg:rotate-2",
  },
];
