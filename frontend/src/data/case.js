import demoImage from '../images/demo.jpg';

export const CASE_DEMO_DESCRIPTIONS = {
  "CINEMATIC REAL ESTATE VIDEO":
    "An atmospheric architectural film crafted to showcase modern residential luxury through fluid gimbal choreography, natural twilight grading, and spatial sound design. Every sequence was paced to highlight open-plan sightlines, warm interior textures, and indoor-outdoor flow—driving stronger buyer inquiries across social and listing platforms.",
  "PC SETUP":
    "A precision studio showcase built around sleek RGB desk architecture, custom hardware craftsmanship, and clean cable-free minimalism. Shot with controlled key lighting, macro lens sweeps, and crisp beat-synced transitions, the piece turns a high-performance workstation into an aspirational lifestyle story tailored for tech campaigns.",
  "DESKTOP":
    "A precision studio showcase built around sleek RGB desk architecture, custom hardware craftsmanship, and clean cable-free minimalism. Shot with controlled key lighting, macro lens sweeps, and crisp beat-synced transitions, the piece turns a high-performance workstation into an aspirational lifestyle story tailored for tech campaigns.",
  "WEDDING":
    "An intimate, documentary-style wedding film capturing candid emotion, golden-hour portraits, and heartfelt vows in a cohesive cinematic narrative. Balanced color science, multi-camera ceremony audio, and thoughtful editorial pacing preserve the atmosphere of the day in a timeless highlight reel.",
  "FITNESS":
    "A high-energy athletic brand commercial driven by kinetic camera movement, rhythmic sound design, and raw training intensity. Designed to build community momentum and drive membership conversions, the campaign pairs gritty gym visuals with punchy short-form edits built for multi-platform digital reach.",
  "SHORT DOCUMENTARY":
    "A character-driven mini-documentary blending intimate interview storytelling with observational b-roll and evocative musical scoring. From pre-production storyboarding to final sound mix and theatrical color grading, the film distills complex human narratives into an engaging visual journey.",
};

const DEFAULT_DEMO_DESCRIPTION =
  "A bespoke creative production crafted by DIGIX from concept and storyboarding through cinematography, editing, color grading, and strategic digital rollout—engineered to capture attention and deliver measurable brand impact.";

export const getCaseDemoDescription = (caseItem) => {
  if (!caseItem) return DEFAULT_DEMO_DESCRIPTION;
  const raw = (caseItem.description || "").trim();
  const normalizedRaw = raw.toLowerCase();
  const isPlaceholder =
    !raw ||
    raw.length < 55 ||
    normalizedRaw.includes("lorem ipsum") ||
    normalizedRaw.includes("this is a description");

  if (!isPlaceholder) {
    return raw;
  }

  const key = (caseItem.name || "").trim().toUpperCase();
  return CASE_DEMO_DESCRIPTIONS[key] || DEFAULT_DEMO_DESCRIPTION;
};

export const CASES = [
  {
    id: 1,
    image: demoImage,
    video: "https://drive.google.com/file/d/13yaptS6auwwwkn9iQazQ-rOI1e7sgbUU/preview",
    name: "CINEMATIC REAL ESTATE VIDEO",
    description: CASE_DEMO_DESCRIPTIONS["CINEMATIC REAL ESTATE VIDEO"],
  },
  {
    id: 2,
    image: demoImage,
    video: "https://drive.google.com/file/d/1JRZkvaIJsDdl0EvYiw4PeguAms3KBp0r/preview",
    name: "FITNESS",
    description: CASE_DEMO_DESCRIPTIONS["FITNESS"],
  },
  {
    id: 3,
    image: demoImage,
    video: "https://drive.google.com/file/d/1lGu6nCa2dJ_pGOr4IGqkhVbyzJ9MEu1k/preview",
    name: "WEDDING",
    description: CASE_DEMO_DESCRIPTIONS["WEDDING"],
  },
  {
    id: 4,
    image: demoImage,
    video: "https://drive.google.com/file/d/1XnFqowhC8Et2hFALAkEdfTrcX-TSVD5e/preview",
    name: "DESKTOP",
    description: CASE_DEMO_DESCRIPTIONS["DESKTOP"],
  },
  {
    id: 5,
    image: demoImage,
    video: "https://drive.google.com/file/d/1Xe89DW-X100jKDuwiKYqMaHMXOVIJgxi/preview",
    name: "SHORT DOCUMENTARY",
    description: CASE_DEMO_DESCRIPTIONS["SHORT DOCUMENTARY"],
  }
];
  