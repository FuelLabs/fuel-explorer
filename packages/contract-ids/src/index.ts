/**
 * @TODO: This package can be moved to "graphql-new" once the new graphql sdk is ready
 * Currently I moved to this place because "graphql-new" is running on a Node.JS environment
 * and "app-commons" currently has some browser packages
 */
export { decodeMessageSentData } from './decodeMessageSentData';
export {
  getBridgeSolidityContracts,
  type BridgeSolidityContracts,
} from './getBridgeSolidityContracts';
export {
  getBridgeTokenContracts,
  type BridgeTokenContracts,
} from './getBridgeTokenContracts';
