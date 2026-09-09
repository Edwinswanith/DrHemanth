import {
  consultationFeeSchema,
  locationSchema,
  type ConsultationFee,
  type Location,
} from "@/lib/content/schema";

/**
 * Every fact below traces to docs/04-content-verification.md, which flags
 * all three locations "legacy public contact page; confirm current before
 * launch." Do not add a field here without also adding/updating its row
 * in that doc.
 */
const rawLocations: Location[] = [
  {
    name: "Spire Bushey Hospital",
    area: "Bushey Heath, Bushey",
    addressLines: ["Heathbourne Road", "Bushey Heath", "Bushey", "Hertfordshire WD23 1RD"],
    hours: ["Monday 19:00 to 20:00", "Alternate Thursdays 10:30 to 12:00"],
    phone: "020 8950 9090",
    directionsHref: "https://goo.gl/maps/YnoXPTZGGHtYt79r9",
    secretary: "Nehali Christian",
    secretaryEmail: "admin@medicalsecs.co.uk",
    status: "verified",
    imageSrc: "/images/keyholesurgeon/spire-bushey-hospital-exterior.jpg",
    imageAlt: "Exterior entrance at Spire Bushey Hospital",
    imageFit: "cover",
  },
  {
    name: "The Clementine Churchill Hospital & Clinics",
    area: "Harrow, Middlesex",
    addressLines: ["Sudbury Hill", "Harrow", "Middlesex HA1 3RX"],
    hours: ["Monday 17:30 to 18:30", "Thursday 14:00 to 17:00"],
    phone: "020 8872 3872",
    directionsHref: "https://goo.gl/maps/LBdu34KihpYHGrJfA",
    secretary: "Nehali Christian",
    secretaryEmail: "admin@medicalsecs.co.uk",
    status: "verified",
    imageSrc: "/images/keyholesurgeon/the-clementine-churchill-hospital.jpg",
    imageAlt: "Exterior of The Clementine Churchill Hospital",
    imageFit: "contain",
  },
  {
    name: "The Wellington Hospital, Elstree Waterfront",
    area: "Elstree, Hertfordshire",
    addressLines: ["The Waterfront Business Park", "Beaufort House, Elstree Road", "Elstree, Hertfordshire WD6 3BS"],
    hours: [],
    phone: "020 3993 9942",
    directionsHref: "https://goo.gl/maps/dP31CTpfn2YQNJzF9",
    secretary: "Nehali Christian",
    secretaryEmail: "admin@medicalsecs.co.uk",
    status: "verified",
  },
];

const rawConsultationFees: ConsultationFee[] = [
  { type: "Initial consultation", telephonic: "£220", faceToFace: "£220" },
  { type: "Follow-up consultation", telephonic: "£180", faceToFace: "£180" },
];

export const practiceLocations: Location[] = rawLocations.map((location) => locationSchema.parse(location));
export const consultationFees: ConsultationFee[] = rawConsultationFees.map((fee) => consultationFeeSchema.parse(fee));
export const generalEmail = "info@keyholesurgeon.co.uk";
