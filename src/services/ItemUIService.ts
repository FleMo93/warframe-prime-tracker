import { observable } from 'knockout';

interface StorageOptions {
  hideObtained: boolean;
}

export class ItemUIService {
  static _searchBarStorageKey = 'WarframeOptions';
  public itemFilter = observable('');
  public hideObtained = observable(false);

  constructor() {
    this.load();
    this.hideObtained.subscribe(this.save);
  }

  private save = (): void => {
    const options: StorageOptions = {
      hideObtained: this.hideObtained()
    };

    window.localStorage.setItem(ItemUIService._searchBarStorageKey, JSON.stringify(options));
  }

  private load = (): void => {
    const value = window.localStorage.getItem(ItemUIService._searchBarStorageKey);
    if (!value) { return; }

    try {
      const options = JSON.parse(value) as StorageOptions;
      this.hideObtained(options.hideObtained);
    } catch (e) {
      window.localStorage.removeItem(ItemUIService._searchBarStorageKey);
      console.error(e);
    }
  }
}