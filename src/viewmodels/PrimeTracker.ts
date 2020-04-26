import { components, ObservableArray, ObservableArrayFunctions, observableArray } from 'knockout';
import { ItemEntry } from './ItemEntry';
import { Item } from 'src/primeData';

export class PrimeTracker {

  itemEntries: ObservableArrayFunctions<ItemEntry> = observableArray();

  constructor(items: Array<Item>) {
    for (const item of items) {
      this.itemEntries.push(new ItemEntry(item));
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