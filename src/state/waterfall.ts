import { MyStateCreator } from './store';


export type Event = {
  eventInput: string,
  eventProperties?: Record<string, any> | undefined,
}

export type EventWithTiming = Event & {
  start: number,
  elapsed: number | null,
}

let time: null | number = null;

export type WaterfallSlice = {
  isGrowing: boolean,
  events: Array<Event>,
  actions: {
    setIsGrowing: (isGrowing: boolean) => void;
    addEvent: (event: Event, newTask: boolean) => void;
  };
};

export const createWaterfallSlice: MyStateCreator<WaterfallSlice> = (set) => ({
  isGrowing: false,
  events: [],
  actions: {
    setIsGrowing: (isGrowing: boolean) => {
      set((state) => {
        state.waterfall.isGrowing = isGrowing;
      });
    },
    addEvent: (event: Event, newTask: boolean) => {
      set((state) => {
        let duration = null;

        if (time == null) {
          time = performance.now();
        } else {
          const newTime = performance.now();
          duration = newTime - time;
          time = newTime;
        };

        if (!newTask && state.waterfall.events.length > 0) {
          state.waterfall.events[state.waterfall.events.length - 1].elapsed = duration;
        }

        const newEvent: EventWithTiming = {
          ...event,
          start: time,
          elapsed: null,
        }
        state.waterfall.events.push(newEvent);
      });
    },
  },
});
