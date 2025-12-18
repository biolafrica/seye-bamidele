import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EventTransformedData } from '@seye-bamidele/shared-types';

interface EventCacheStore {
  events: EventTransformedData[];
  cacheEvents: (events: EventTransformedData[]) => void;
  appendEvents: (events: EventTransformedData[]) => void;
  clearCache: () => void;
}

export const useEventCache = create<EventCacheStore>()(
  persist(
    (set) => ({
      events: [],
      
      cacheEvents: (events) => set({ events }),
      
      appendEvents: (newEvents) =>
        set((state) => {
          const existingIds = new Set(state.events.map(e => e.id));
          const uniqueNewEvents = newEvents.filter(e => !existingIds.has(e.id));
          return { events: [...state.events, ...uniqueNewEvents] };
        }),
      
      clearCache: () => set({ events: [] }),
    }),
    { 
      name: 'event-cache',
    }
  )
);