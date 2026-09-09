export type SurgicalComparisonRow = {
  factor: string;
  robotic: string;
  laparoscopic: string;
};

export const surgicalComparisonRows: SurgicalComparisonRow[] = [
  {
    factor: "Who controls the instruments",
    robotic: "Console-controlled instruments move only with the surgeon.",
    laparoscopic: "The surgeon moves hand-held instruments directly.",
  },
  {
    factor: "Camera view",
    robotic: "Magnified 3D view controlled from the console.",
    laparoscopic: "High-definition 2D or 3D view, usually assistant-held or fixed.",
  },
  {
    factor: "Instrument movement",
    robotic: "Wristed instruments can help fine movement in selected operations.",
    laparoscopic: "Straight instruments have a more limited range of motion.",
  },
  {
    factor: "Suitability",
    robotic: "Used only when it offers a clear benefit for the procedure and patient.",
    laparoscopic: "Widely used across general and upper GI surgery.",
  },
  {
    factor: "Risks",
    robotic: "General surgical risks still apply, plus equipment-specific considerations.",
    laparoscopic: "General surgical and anaesthetic risks still apply.",
  },
  {
    factor: "Recovery",
    robotic: "Often comparable with laparoscopic surgery; individual recovery varies.",
    laparoscopic: "Often quicker than open surgery; individual recovery varies.",
  },
  {
    factor: "Evidence",
    robotic: "Evidence is growing, but benefit varies by procedure.",
    laparoscopic: "Long-established evidence across many procedures.",
  },
];

export const homepageComparisonRows = surgicalComparisonRows.slice(0, 5);
