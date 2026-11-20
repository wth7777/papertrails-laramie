/** A row of `width` spaces with strings stamped at given columns:
 *  sparse(40, [3, 'BMB'], [10, 'ccc'])  →  '   BMB    ccc...'
 */
export function sparse(width, ...stamps) {
  const row = Array(width).fill(' ');
  for (const [col, text] of stamps) {
    for (let i = 0; i < text.length; i++) row[col + i] = text[i];
  }
  return row.join('');
}

/** n spaces — for readability in level files. */
export const gap = (n) => ' '.repeat(n);

/** n solid tiles. */
export const ground = (n) => 'X'.repeat(n);

/** n decorative ground tiles (visual only, no collision). */
export const groundDeco = (n) => 'x'.repeat(n);
