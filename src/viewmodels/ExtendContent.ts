import { components, observable, ObservableFunctions } from 'knockout';

export interface ExtendContentModel {
  show?: ObservableFunctions<boolean>;
  headline?: ObservableFunctions<string>;
}

class ExtendButton {
  public show: ObservableFunctions<boolean>;
  public headline?: ObservableFunctions<string>;

  constructor(model: ExtendContentModel) {
    this.show = model.show ?? observable(false);
    this.headline = model.headline;
  }

  public toggle = (): void => {
    this.show(!this.show());
  }
}

export const registerControl = (name: string): void => {
  if (components.isRegistered(name)) { throw Error(`Component ${name} already registered`); }

  components.register(name, {
    template: require('../views/extendContent.html'),
    viewModel: ExtendButton
  });
  require('../views/extendContent.css');
}