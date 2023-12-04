/**
 * Extracts all matches from a given string based on the provided regular expression.
 *
 * Each match is returned as an array where the first element is the matched string,
 * and the second element is the index of the match in the original string.
 *
 * @param {string} str - A string from where to extract matches.
 * @param {RegExp} regex - A regular expression used to find matches.
 * @return {[string, number][]} An array of tuples, each containing a match and its index.
 *
 * @example
 * extractMatches("467..114..", /(\d+)/g);
 * Returns: [["467", 0], ["114", 5]]
 */
export function extractMatches(str: string, regex: RegExp): [string, number][] {
  const matches = [...str.matchAll(regex)] || [];
  return matches.map((match) => [match[0], match.index] as [string, number]);
}

/**
 * Generates indexes adjacent to a specified substring within a larger string.
 *
 * @param {string} enginePart - The substring whose adjacent indexes are to be found.
 * @param {number} enginePartIndex - The starting index of the substring.
 * @returns {number[][]} An array of two sub-arrays:
 *   - The first sub-array contains the indexes immediately before and after the substring.
 *   - The second sub-array contains the indexes spanning the substring, including its immediate boundaries.
 */
export function generateAdjacentIndexes(
  enginePart: string,
  enginePartIndex: number,
): number[][] {
  const leftIndex = enginePartIndex - 1;
  const rightIndex = enginePartIndex + enginePart.length;

  const enginePartIndexes = enginePart
    .split('')
    .map((_, i) => i + enginePartIndex);

  return [
    [leftIndex, rightIndex],
    [leftIndex, ...enginePartIndexes, rightIndex],
  ];
}
