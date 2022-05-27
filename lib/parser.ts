export abstract class Parser<T> {
  public abstract parse(raw: string): T;
}
