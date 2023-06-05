import React from 'react';
import Waterfall, { sampleEvents } from './Waterfall';
import EventView from './EventView';
import { IWaterfallEvent, useEventStore } from '../state/store';

export default function Analytics() {
  const [selectedEventIndex, setSelectedEventIndex] = React.useState<
    number | null
  >(null);

  const events = useEventStore.getState().events;
  // FOR FRONTEND DEV PURPOSES ONLY
  // const events = sampleEvents;

  return (
    <div className="mt-4 flex flex-col grow">
      <Waterfall setSelectedEventIndex={setSelectedEventIndex} />
      <EventView
        event={selectedEventIndex ? events[selectedEventIndex] : null}
      />
    </div>
  );
}
