/**
 * Returns the risk level and CSS variable for a given UV index.
 * Single source of truth for UV thresholds.
 */
export function getUvCategory(uvIndex) {
  if (uvIndex === null || uvIndex === undefined) {
    return { level: 'Unknown', colorVar: 'var(--color-light)' };
  }

  // Round down to whole numbers to handle decimal UV values (e.g. 2.4)
  const uv = Math.floor(uvIndex);

  if (uv <= 2) return { level: 'Low', colorVar: 'var(--color-low)' };
  if (uv <= 5) return { level: 'Moderate', colorVar: 'var(--color-moderate)' };
  if (uv <= 7) return { level: 'High', colorVar: 'var(--color-high)' };
  if (uv <= 10) return { level: 'Very High', colorVar: 'var(--color-very-high)' };
  return { level: 'Extreme', colorVar: 'var(--color-extreme)' }; // 11+
}

export function getUvColorVariable(uvIndex) {
  return getUvCategory(uvIndex).colorVar;
}