// Thrown by input-validation call sites (address parsing, event-id parsing,
// page-size caps) so the REST router (rest/router.ts) can tell "the caller
// sent something wrong" (400) apart from every other failure -- a cosmos/L1
// RPC call throwing, a downstream store hitting a sqlite error, etc. -- none
// of which are the caller's fault and shouldn't be reported as if they were.
export class ValidationError extends Error {}
