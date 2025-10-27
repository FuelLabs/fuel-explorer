import { logger } from '~/core/Logger';
import BridgeDAO from '~/infra/dao/BridgeDAO';
import type {
  GQLBridgeResponse,
  GQLQueryBridgeEventArgs,
  GQLQueryBridgeEventsArgs,
} from '../generated/sdk-provider';

export class BridgeResolver {
  static create() {
    const resolvers = new BridgeResolver();
    return {
      Query: {
        bridgeEvents: resolvers.bridgeEvents,
        bridgeEvent: resolvers.bridgeEvent,
      },
    };
  }

  async bridgeEvents(_: any, params: GQLQueryBridgeEventsArgs) {
    logger.debug('GraphQL', 'BridgeResolver.bridgeEvents');
    const address = params.address;
    const limit = params.limit || 10;
    const offset = params.offset || 0;
    const bridgeDAO = new BridgeDAO();
    const output = await bridgeDAO.getEvents(address, limit, offset);
    for (const element of output.nodes) {
      element.__typename = `Bridge${element.type}Response`;
    }
    return output;
  }

  async bridgeEvent(_: any, params: GQLQueryBridgeEventArgs) {
    logger.debug('GraphQL', 'BridgeResolver.bridgeEvent');
    const eventId = params.eventId;
    const eventType = params.eventType;
    const bridgeDAO = new BridgeDAO();
    const output = await bridgeDAO.getEvent(eventType, eventId);
    if (!output) return {};
    return {
      __typename:
        `Bridge${output.type}Response` as GQLBridgeResponse['__typename'],
      ...output,
    };
  }
}
