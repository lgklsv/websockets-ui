export class AppError extends Error {
  constructor(
    public type: AvailableMesTypes,
    public message: string
  ) {
    super();
  }
}
