export interface Relic {
  name: string;
}

export interface Component {
  name: string;
  itemCount: string;
  imageName: string;
  uniqueName: string;
  drops: Array<Relic>;
}

export interface Item {
  name: string;
  category: string;
  obtainable: boolean;
  imageName: string;
  uniqueName: string;
  components: Array<Component>;
}

export const data: Array<Item>;
