/**
 * Returns the CSS variable name corresponding to a given UV index value.
 * @param {number} uvIndex - The UV index from the weather JSON response.
 * @returns {string} The CSS variable name.
 */
export function getUvColorVariable(uvIndex) {
  if (uvIndex === null || uvIndex === undefined) {
    return 'var(--color-light)';
  }

  // Round down to whole numbers to handle decimal UV values (e.g. 2.4)
  const uv = Math.floor(uvIndex);

  if (uv <= 2) {
    return 'var(--color-low)';
  } else if (uv <= 5) {
    return 'var(--color-moderate)';
  } else if (uv <= 7) {
    return 'var(--color-high)';
  } else if (uv <= 10) {
    return 'var(--color-very-high)';
  } else {
    return 'var(--color-extreme)'; // 11+
  }
}