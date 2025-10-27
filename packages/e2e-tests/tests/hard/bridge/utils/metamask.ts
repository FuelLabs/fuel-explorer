let metaMaskInstance: any | null = null;

export function setMetaMask(instance: any) {
  metaMaskInstance = instance;
}

function requireMM() {
  if (!metaMaskInstance) throw new Error('MetaMask instance not set');
  return metaMaskInstance as any;
}

export async function confirmTransaction() {
  return requireMM().confirmTransaction();
}

export async function confirmPermissionToSpend(options?: {
  spendLimit?: 'max' | number;
}) {
  return requireMM().approveTokenPermission(options);
}

export async function approveTokenPermission() {
  return requireMM().approveTokenPermission();
}

export async function rejectPermissionToSpend() {
  return requireMM().rejectTokenPermission();
}

export async function acceptAccess(options?: { switchNetwork?: boolean }) {
  return requireMM().acceptAccess(options);
}

export async function connectToDapp() {
  const mm = requireMM();
  if (typeof mm.connectToDapp === 'function') {
    return mm.connectToDapp();
  }
  return mm.acceptAccess();
}

// Optional pass-through helpers (used by callers if available in current synpress version)
export async function approveAddAndSwitchNetwork() {
  const mm = requireMM();
  if (typeof mm.approveAddAndSwitchNetwork === 'function') {
    return mm.approveAddAndSwitchNetwork();
  }
  return mm.acceptAccess({ switchNetwork: true });
}
export async function approveNewNetwork() {
  const mm = requireMM();
  if (typeof mm.approveNewNetwork === 'function') {
    return mm.approveNewNetwork();
  }
  return mm.acceptAccess({ switchNetwork: true });
}

export async function approveSwitchNetwork() {
  const mm = requireMM();
  if (typeof mm.approveSwitchNetwork === 'function') {
    return mm.approveSwitchNetwork();
  }
  return mm.acceptAccess({ switchNetwork: true });
}

export async function approveAddNetwork() {
  return requireMM().approveAddNetwork?.();
}

// Default export: a typed-ish proxy to forward any property/method to the instance
const metamask = new Proxy(
  {},
  {
    get(_target, prop: string) {
      const mm = requireMM();
      const value = (mm as any)[prop];
      return typeof value === 'function' ? value.bind(mm) : value;
    },
  },
) as any;

export default metamask;
