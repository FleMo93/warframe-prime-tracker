import { TypedEventHandler, TypedEvent } from '../helper/Event';

export class ItemStorageService {
  private static _storageId = 'WarframeItems';
  private storage: Array<string>;
  private _onItemChanged: TypedEvent<void>;

  public onItemChanged: TypedEventHandler<void>;

  constructor() {
    const storedValue = window.localStorage.getItem(ItemStorageService._storageId);
    this._onItemChanged = new TypedEvent();
    this.onItemChanged = this._onItemChanged;

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

  public import = (storage: string): void => {
    this.storage = JSON.parse(storage);
    this.save();
    this._onItemChanged.trigger();
  }

  private save = (): void => {
    window.localStorage.setItem(ItemStorageService._storageId, JSON.stringify(this.storage));
  }
}