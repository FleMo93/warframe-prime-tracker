import { registerControl as registerEntry } from './viewmodels/ItemEntry'
import { registerControl as registerPrimeTracker } from './viewmodels/PrimeTracker';
import { registerControl as registerComponent } from './viewmodels/ComponentEntry';
import { registerControl as registerDrop } from './viewmodels/RelicEntry';
import { registerControl as registerSearchBar } from './viewmodels/SearchBar';
import { registerControl as registerTabContainer } from './viewmodels/TabContainer';
import { registerControl } from './viewmodels/ExtendContent';

export const registerControls = (): void => {
  registerPrimeTracker('primetracker');
  registerEntry('itementry');
  registerComponent('componententry');
  registerControl('extendcontent');
  registerDrop('relic');
  registerSearchBar('searchbar');
  registerTabContainer('tabcontainer', 'tabcontent');
}