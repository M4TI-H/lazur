export async function fetchData<T>(
  url: string,
  options?: any
): Promise<{ data?: T; error?: string }> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()) as T;
    return { data };
  } catch (error: any) {
    return { error: error.message };
  }
}
