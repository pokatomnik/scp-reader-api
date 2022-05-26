export class HttpError extends Error {
  public constructor(
    public readonly HTTPCode: number,
    public readonly ID: string,
    public override readonly message: string = ''
  ) {
    super();
  }
}
