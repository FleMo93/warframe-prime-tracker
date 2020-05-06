import { components, observable, pureComputed, ObservableArray, observableArray } from 'knockout';
import { Item } from 'src/primeData';
import { ComponentEntry } from './ComponentEntry';
import { ItemStorageService } from 'src/services/ItemStorageService';
import { Obtainable } from './Obtainable';
import { ItemUIService } from 'src/services/ItemUIService';

export class ItemEntry extends Obtainable {
  private item: Item;
  private itemUIService: ItemUIService;

  public show = pureComputed({
    read: () => {
      const showByName = this.item.name.toLowerCase().indexOf(
        this.itemUIService.itemFilter().toLowerCase()) > -1;

      const showByObtained = this.itemUIService.hideObtained() ? !this.obtained() : true;

      return showByName && showByObtained;
    }
  });

  public name = pureComputed({ read: () => this.item.name });
  public obtainable = pureComputed({ read: () => this.item.obtainable });
  public showComponents = observable(false);
  public components: ObservableArray<ComponentEntry> = observableArray();
  public imgUrl = '';

  constructor(item: Item, itemStorageService: ItemStorageService, itemUIService: ItemUIService) {
    super(item.uniqueName, itemStorageService);
    this.itemUIService = itemUIService;
    this.item = item;
    this.imgUrl = item.imageName;

    if (!item.components) { return; }

    for (const component of item.components) {
      this.components.push(new ComponentEntry(component, itemStorageService));
    }
  }
}

export const registerControl = (name: string): void => {
  if (components.isRegistered(name)) { throw Error(`Component ${name} already registered`); }

  components.register(name, {
    template: require('../views/itemEntry.html')
  });
  require('../views/itemEntry.css');
}