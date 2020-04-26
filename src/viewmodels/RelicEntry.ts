import { components, pureComputed } from 'knockout';
import { Relic } from 'src/primeData';

export class DropEntry {
  private relic: Relic;

  public location = pureComputed({ read: () => this.relic.name });

  constructor(relic: Relic) {
    this.relic = relic;
  }
}

export const registerControl = (name: string): void => {
  if (components.isRegistered(name)) { throw Error(`Component ${name} already registered`); }

  components.register(name, {
    template: require('../views/relicEntry.html'),
  });
  require('../views/relicEntry.css');
}