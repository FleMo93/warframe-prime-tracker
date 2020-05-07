import { components, pureComputed, observable, observableArray, ObservableArrayFunctions } from 'knockout';
import { Drop } from 'warframe-items';
import { DropEntry } from './RelicEntry'
import { Component } from 'src/primeData';
import { ItemStorageService } from 'src/services/ItemStorageService';
import { Obtainable } from './Obtainable';

export class ComponentEntry extends Obtainable {
  private component: Component;

  public name = pureComputed({ read: () => this.component.name });
  public description = pureComputed({ read: () => this.component.description });
  public drops: ObservableArrayFunctions<Drop> = observableArray();
  public showDrops = observable(false);
  public itemCount = pureComputed({ read: () => this.component.itemCount });
  public imgUrl = ``;

  constructor(component: Component, itemStorageService: ItemStorageService) {
    super(component.uniqueName, itemStorageService);

    this.component = component;
    this.imgUrl = component.imageName;
    if (!this.component.drops) { return; }
    this.drops(this.component.drops.map((drop) => new DropEntry(drop)));
  }
}

export const registerControl = (name: string): void => {
  if (components.isRegistered(name)) { throw Error(`Component ${name} already registered`); }

  components.register(name, {
    template: require('../views/componentEntry.html')
  });
  require('../views/componentEntry.css');
}