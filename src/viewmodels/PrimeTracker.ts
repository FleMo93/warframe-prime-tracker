import { components, ObservableArray, ObservableArrayFunctions, observableArray } from 'knockout';
import { ItemEntry } from './ItemEntry';
import { Item } from 'src/primeData';
import { ItemStorageService } from 'src/services/ItemStorageService';
import { SearchBar } from './SearchBar';
import { ItemUIService } from 'src/services/ItemUIService';

export class PrimeTracker {

  itemEntries: ObservableArrayFunctions<ItemEntry> = observableArray();
  searchBar: SearchBar;

  constructor(items: Array<Item>, itemStorageService: ItemStorageService, itemUIService: ItemUIService) {
    this.searchBar = new SearchBar(itemUIService);

    for (const item of items) {
      this.itemEntries.push(new ItemEntry(item, itemStorageService, itemUIService));
    }
  }
}

export const registerControl = (name: string): void => {
  if (components.isRegistered(name)) { throw Error(`Component ${name} already registered`); }

  components.register(name, {
    template: require('../views/primeTracker.html')
  });
  require('../views/primeTracker.css');
}