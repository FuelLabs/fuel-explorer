import { WarningToast } from './WarningToast';

export class ContractPausedError extends WarningToast {
  constructor() {
    super(
      'A contract involved in this operation is paused. For assistance, please contact us on Discord or the Fuel Forum.',
    );
    this.name = 'ContractPausedError';
    Object.setPrototypeOf(this, ContractPausedError.prototype);
  }
}
