import { components, PureComputed, pureComputed } from 'knockout';
import { ItemUIService } from 'src/services/ItemUIService';

export class SearchBar {

  private itemUIService: ItemUIService;

  public hideObtained: PureComputed<boolean> = pureComputed({
    read: () => this.itemUIService.hideObtained(),
    write: (value) => this.itemUIService.hideObtained(value)
  });

  public itemFilter: PureComputed<string> = pureComputed({
    read: () => this.itemUIService.itemFilter(),
    write: (value) => this.itemUIService.itemFilter(value)
  });

  constructor(itemUIService: ItemUIService) {
    this.itemUIService = itemUIService;
  }
}

export const registerControl = (name: string): void => {
  if (components.isRegistered(name)) { throw Error(`Component ${name} already registered`); }

  components.register(name, {
    template: require('../views/searchBar.html'),
  });
  require('../views/searchBar.css');
}