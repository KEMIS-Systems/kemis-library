export function debounce(
  time: number,
  callback?: (...args: any[]) => any,
  ...params: any[]
): void {
  const DEBOUNCE_ID = sessionStorage.getItem('DEBOUNCE_ID');

  if (DEBOUNCE_ID) clearTimeout(DEBOUNCE_ID as unknown as NodeJS.Timeout);

  const DEBOUNCE_CREATED_ID = setTimeout(() => {
    if (callback && typeof callback === 'function') callback(...params);
  }, time);

  sessionStorage.setItem(
    'DEBOUNCE_ID',
    DEBOUNCE_CREATED_ID as unknown as string,
  );
}
