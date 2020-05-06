import { ItemStorageService } from 'src/services/ItemStorageService';
import { Observable, observable } from 'knockout';

export class Obtainable {
  public obtained: Observable<boolean>;

  constructor(uniqueId: string, itemStorageService: ItemStorageService) {
    this.obtained = observable(itemStorageService.isObtained(uniqueId));
    this.obtained.subscribe((obtained) => itemStorageService.setObtained(uniqueId, obtained));
  }
}