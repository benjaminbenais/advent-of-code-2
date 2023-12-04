/**
 * Extract all numbers in a string.
 *
 * @param str - The string to extract numbers from.
 * @returns An array containing the extracted numbers.
 */
function parseNumbers(str: string): number[] {
  return str.match(/\d+/g)?.map(Number) || [];
}

/**
 * Parse the content of a card to retrieve
 * the winning numbers and player numbers.
 *
 * @param {string} card - The content of a card.
 * @returns An array containing two sub-arrays:
 * - the first one is the winning numbers
 * - the second one is the player numbers
 *
 * @example
 * card content "Card 1: 41 48 83 | 83 86  6 31"
 * Returns [[41, 48, 83, 86], [83, 86, 6, 31]]
 */
export function parseCard(card: string): number[][] {
  const parsedCard = card.replace(/Card\s+\d+\:\s+/, '');
  return parsedCard.split(' | ').map(parseNumbers);
}
