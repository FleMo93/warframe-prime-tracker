import { applyBindings } from 'knockout';
import { registerControls } from './Controls';
import { PrimeTracker } from './viewmodels/PrimeTracker';
// import primeData from './primeData';
import primeData from './primeData.js';
import { ItemStorageService } from './services/ItemStorageService';
import { ItemUIService } from './services/ItemUIService';

export default (htmlElement: HTMLElement): void => {
  registerControls();
  
  const element = document.createElement('primetracker');
  element.setAttribute('params', 'vm: $data');
  htmlElement.appendChild(element);
  const itemStorageService = new ItemStorageService();
  const itemUIService = new ItemUIService();
  const tracker = new PrimeTracker(primeData, itemStorageService, itemUIService);
  applyBindings(tracker, htmlElement);
}