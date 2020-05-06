export class ItemStorageService {
  private static _storageId: string = 'WarframeItems';
  storage: Array<string>;

  constructor() {
    const storedValue = window.localStorage.getItem(ItemStorageService._storageId);

    if (!storedValue) {
      this.storage = [];
    } else {
      this.storage = JSON.parse(storedValue);
    }
  }

  public isObtained = (id: string): boolean => {
    return this.storage.indexOf(id) > -1;
  }

  public setObtained = (id: string, value: boolean): void => {
    const index = this.storage.indexOf(id);

    if (value && index === -1) {
      this.storage.push(id);
      this.save();
    } else if (!value && index > -1) {
      this.storage.splice(index, 1);
      this.save();
    }
  }

  public export = (): string => {
    return JSON.stringify(this.storage);
  }

  public import = (storage: string) => {
    this.storage = JSON.parse(storage);
  }

  private save = (): void => {
    window.localStorage.setItem(ItemStorageService._storageId, JSON.stringify(this.storage));
  }
}