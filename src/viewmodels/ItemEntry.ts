import { components, observable, pureComputed, ObservableArray, observableArray } from 'knockout';
import { Item } from 'src/primeData';
import { ComponentEntry } from './ComponentEntry';

export class ItemEntry {
  private item: Item;

  public name = pureComputed({ read: () => this.item.name });
  public obtainable = pureComputed({ read: () => this.item.obtainable });
  public showComponents = observable(false);
  public components: ObservableArray<ComponentEntry> = observableArray();
  public obtained = observable(false);
  public imgUrl = '';

  constructor(item: Item) {
    this.item = item;
    this.imgUrl = item.imageName;
    if (!item.components) { return; }

    for (const component of item.components) {
      this.components.push(new ComponentEntry(component));
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