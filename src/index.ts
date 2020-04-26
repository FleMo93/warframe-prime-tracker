import { applyBindings } from 'knockout';
import { registerControls } from './Controls';
import { PrimeTracker } from './viewmodels/PrimeTracker';
// import primeData from './primeData';
import primeData from './primeData.js';

export default (htmlElement: HTMLElement): void => {
  registerControls();
  
  const element = document.createElement('primetracker');
  element.setAttribute('params', 'vm: $data');
  htmlElement.appendChild(element);
  const tracker = new PrimeTracker(primeData);
  applyBindings(tracker, htmlElement);
}