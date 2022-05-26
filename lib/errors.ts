export class HttpError extends Error {
  public constructor(
    public readonly HTTPCode: number,
    public readonly ID: string,
    public readonly message: string = ""
  ) {
    super();
  }
}
