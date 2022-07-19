function delay(ms: number): Promise<object> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchDelay(url: string, options: Object) {
  await delay(Math.random() * 2000);
  return fetch(url, options);
}

export default fetchDelay;
