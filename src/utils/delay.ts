/**
 * Returns a Promise that resolves after a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to wait.
 * @returns A Promise that resolves after the delay.
 *
 * @example
 * await delay(1000);
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
