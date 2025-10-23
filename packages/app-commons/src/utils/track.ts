import { FUEL_CHAIN_NAME } from '../constants/chainName';
import { ETH_CHAIN_NAME } from '../constants/chainName';

export type TrackEvent = {
  eventType: string;
  eventName: string;

  parameters: Record<string, any>;
};

export function trackEvent(event: TrackEvent) {
  try {
    let trackFn = (e: TrackEvent) => {
      console.log('track', e);
    };
    if (typeof window === 'object') {
      trackFn = (window as any).safary?.track || trackFn;
    }
    trackFn({
      ...event,
      parameters: {
        chain: ETH_CHAIN_NAME,
        fuelChain: FUEL_CHAIN_NAME,
        ...event.parameters,
      },
    });
  } catch {}
}
