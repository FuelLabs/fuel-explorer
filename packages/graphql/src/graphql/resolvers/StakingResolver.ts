import { logger } from '~/core/Logger';
import StakingDAO from '~/infra/dao/StakingDAO';
import PaginatedParams from '~/infra/paginator/PaginatedParams';
import type {
  GQLQueryStakingEventArgs,
  GQLQueryStakingEventsArgs,
  GQLStakingEventResponse,
  GQLStakingEventsResult,
} from '../generated/sdk-provider';

export class StakingResolver {
  static create() {
    const resolvers = new StakingResolver();
    return {
      Query: {
        stakingEvents: resolvers.stakingEvents,
        stakingEvent: resolvers.stakingEvent,
      },
    };
  }

  async stakingEvents(
    _: GQLStakingEventsResult,
    params: GQLQueryStakingEventsArgs,
  ) {
    logger.debug('GraphQL', 'StakingResolver.stakingEvents');
    const paginatedParams = new PaginatedParams(params);
    const stakingDAO = new StakingDAO();
    const output = await stakingDAO.getEvents(params.address, paginatedParams);
    for (const element of output.nodes) {
      element.__typename = `${element.type}Response`;
    }
    return output;
  }

  async stakingEvent(
    _: GQLStakingEventsResult,
    params: GQLQueryStakingEventArgs,
  ) {
    logger.debug('GraphQL', 'StakingResolver.stakingEvent');
    const eventId = params.eventId;
    const stakingDAO = new StakingDAO();
    const output = await stakingDAO.getEvent(eventId);
    return {
      __typename:
        `${output.type}Response` as GQLStakingEventResponse['__typename'],
      ...output,
    };
  }
}
