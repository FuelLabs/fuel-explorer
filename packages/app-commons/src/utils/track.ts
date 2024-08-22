export type TrackEvent = {
  eventType: string;
  eventName: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  parameters: Record<string, any>;
};

export function trackEvent(event: TrackEvent) {
  try {
    let trackFn = (e: TrackEvent) => {
      console.log('track', e);
    };
    if (typeof window === 'object') {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      trackFn = (window as any).safary?.track || trackFn;
    }
    trackFn(event);
  } catch {}
}
