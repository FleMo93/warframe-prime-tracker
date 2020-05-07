import { components, observableArray, ObservableArray, observable } from 'knockout';
import { ItemEntry } from './ItemEntry';
import { Item } from 'src/primeData';
import { ItemStorageService } from 'src/services/ItemStorageService';
import { SearchBar } from './SearchBar';
import { ItemUIService } from 'src/services/ItemUIService';
import { ItemCategory } from 'src/interfaces/ItemCategory';

export class PrimeTracker {
  private itemStorageService: ItemStorageService;
  public itemCategories: ObservableArray<ItemCategory> = observableArray();
  public searchBar: SearchBar;

  constructor(items: Array<Item>, itemStorageService: ItemStorageService, itemUIService: ItemUIService) {
    this.itemStorageService = itemStorageService;
    this.searchBar = new SearchBar(itemUIService);
    this.itemCategories = observableArray();

    const allGroup: ItemCategory = {
      name: 'All',
      items: observableArray(),
      active: observable(true)
    };

    this.itemCategories.push(allGroup);

    for (const item of items) {
      let group = this.itemCategories().find((cat) => cat.name === item.category);

      if(!group) {
        group = {
          name: item.category,
          items: observableArray(),
          active: observable(false)
        };

        this.itemCategories.push(group);
      }

      const itemEntry = new ItemEntry(item, itemStorageService, itemUIService);
      allGroup.items.push(itemEntry);
      group.items.push(itemEntry);
    }
  }

  public export = (): void => {
    const data = this.itemStorageService.export();
    const aElement = document.createElement('a');

    const blob = new Blob([data], {
      type: 'text/plain;charset=utf-8'
    });
    const url = window.URL.createObjectURL(blob);

    aElement.download = 'PrimeTracker-' + Date.now() + '.json';
    aElement.href = url;
    aElement.click();
  }

  public import = (): void => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = '.json';
    inputElement.click();
    inputElement.addEventListener('change', () => {
      if (!inputElement.files || inputElement.files.length === 0) { throw Error('File not found'); }
      const file = inputElement.files.item(0);
      if (!file) { throw Error('File not found'); }
      const reader = new FileReader();

      reader.addEventListener('loadend', () => {
        if (!reader.result) { throw Error('Could not read file'); }
        this.itemStorageService.import(reader.result.toString());
      });

      reader.readAsText(file);
    })
  }
}

export const registerControl = (name: string): void => {
  if (components.isRegistered(name)) { throw Error(`Component ${name} already registered`); }

  components.register(name, {
    template: require('../views/primeTracker.html')
  });
  require('../views/primeTracker.css');
}