export class WarningToast extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, WarningToast.prototype);
  }
}
