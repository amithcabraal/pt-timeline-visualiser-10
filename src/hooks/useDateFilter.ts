import { useMemo } from 'react';
import { Event } from '../types/Event';
import { getTimeWindow, TimeRange } from '../utils/timeWindow';

export function useDateFilter(events: Event[], focusDate: Date, timeRange: TimeRange) {
  const { start: timelineStart, end: timelineEnd } = getTimeWindow(focusDate, timeRange);

  const dateFilteredEvents = useMemo(() => {
    return events.filter(event => {
      // Check if the event overlaps with the current time window
      const eventStart = event.startDate.getTime();
      const eventEnd = event.endDate.getTime();
      const windowStart = timelineStart.getTime();
      const windowEnd = timelineEnd.getTime();

      return (
        (eventStart >= windowStart && eventStart <= windowEnd) || // Event starts in window
        (eventEnd >= windowStart && eventEnd <= windowEnd) || // Event ends in window
        (eventStart <= windowStart && eventEnd >= windowEnd) // Event spans window
      );
    });
  }, [events, timelineStart, timelineEnd]);

  return {
    dateFilteredEvents,
    timelineStart,
    timelineEnd
  };
}