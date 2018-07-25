export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}
