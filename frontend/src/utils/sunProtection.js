export const FITZPATRICK_TYPES = [
  { type: 1, label: 'Type I - Very Fair', description: 'Always burns easily, never tans', baseMinutes: 67 },
  { type: 2, label: 'Type II - Fair', description: 'Usually burns, tans minimally', baseMinutes: 100 },
  { type: 3, label: 'Type III - Medium', description: 'Sometimes burns mildly, tans uniformly', baseMinutes: 200 },
  { type: 4, label: 'Type IV - Olive', description: 'Rarely burns, tans easily', baseMinutes: 300 },
  { type: 5, label: 'Type V - Dark Brown', description: 'Very rarely burns, tans very easily', baseMinutes: 400 },
  { type: 6, label: 'Type VI - Very Dark/Black', description: 'Never burns, deeply pigmented', baseMinutes: 500 },
];

export function calculateProtectionData(skinTypeNumber, uvIndex) {
  const selectedType =
    FITZPATRICK_TYPES.find((t) => t.type === Number(skinTypeNumber)) ||
    FITZPATRICK_TYPES[1];

  const safeUv = !uvIndex || uvIndex <= 0 ? 1 : uvIndex;
  const timeToBurnMinutes = Math.round(selectedType.baseMinutes / safeUv);

  let recommendedSpf = 'SPF 15+';
  let advice = 'Wear sunglasses and apply SPF 15+ if outdoors for prolonged periods.';

  if (uvIndex >= 3 && uvIndex <= 5) {
    recommendedSpf = 'SPF 30+';
    advice = 'Wear a hat, sunglasses, and broad-spectrum SPF 30+ sunscreen.';
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    recommendedSpf = 'SPF 30+ to 50+';
    advice = 'Seek shade during midday hours. Reapply sunscreen every 2 hours.';
  } else if (uvIndex >= 8) {
    recommendedSpf = 'SPF 50+';
    advice = 'Minimize direct sun exposure between 10 AM and 4 PM. Full protection required.';
  }

  return {
    timeToBurnMinutes: uvIndex > 0 ? timeToBurnMinutes : Infinity,
    recommendedSpf,
    advice,
  };
}