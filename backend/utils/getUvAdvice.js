export function getUvAdvice(uvIndex) {
  if (uvIndex <= 2) {
    return "Low risk. Sunscreen is generally not required unless you are outside for a long time.";
  } else if (uvIndex <= 5) {
    return "Moderate risk. Apply a broad-spectrum sunscreen of SPF 30 or higher.";
  } else if (uvIndex <= 7) {
    return "High risk. Generously apply SPF 30+, wear a hat, and wear sunglasses.";
  } else {
    return "Very High to Extreme risk. Use SPF 50+, wear protective clothing, and avoid midday sun.";
  }
};