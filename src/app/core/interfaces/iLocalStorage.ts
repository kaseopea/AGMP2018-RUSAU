export interface ILocalStorage {
  key(key: string);
  getItem(key: string);
  setItem(key: string, value: any);
  removeItem(key: string);
  clear();
}
