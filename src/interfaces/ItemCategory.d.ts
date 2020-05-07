import { ObservableArrayFunctions, Observable } from "knockout";
import { ItemEntry } from "src/viewmodels/ItemEntry";

export interface ItemCategory {
  name: string;
  items: ObservableArrayFunctions<ItemEntry>;
  active: Observable<boolean>;
}