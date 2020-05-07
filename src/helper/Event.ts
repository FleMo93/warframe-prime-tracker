export interface TypedEventHandler<T> {
  on(handler: { (data: T): void }): void;
  off(handler: { (data: T): void }): void;
}

export class TypedEvent<T> implements TypedEventHandler<T> {
  private handlers: { (data: T): void }[] = [];
  private reatinedValue: T | undefined = undefined;

  public on = (handler: { (data: T): void }): void => {
    this.handlers.push(handler);

    if(this.reatinedValue) {
      handler(this.reatinedValue);
    }
  }

  public off = (handler: { (data: T): void }): void => {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  public trigger = (data: T, retained?: boolean): void => {
    this.handlers.slice(0).forEach(h => h(data));

    if(retained) {
      this.reatinedValue = data;
    }
  }
}
