async function FetchWithTimeout(url, opts = {}, timeout = 5000) {
  // Create the AbortController instance, get AbortSignal
  const abortController = new AbortController();
  const { signal } = abortController;

  // Make the fetch request
  const _fetchPromise = fetch(url, {
    ...opts,
    signal,
  });

  // Start the timer
  const timer = setTimeout(() => abortController.abort(), timeout);

  // Await the fetch with a catch in case it's aborted which signals an error
  try {
    const result = await _fetchPromise;
    clearTimeout(timer);
    return result;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}
export default FetchWithTimeout;
