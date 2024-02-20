export default async function retryFn<T>(
  asyncFn: () => Promise<T>,
  retries = 3
): Promise<T | undefined> {
  try {
    return await asyncFn();
  } catch (error) {
    if (retries > 0) {
      return await retryFn(asyncFn, retries - 1);
    } else {
      throw Error(String(Error));
    }
  }
}
