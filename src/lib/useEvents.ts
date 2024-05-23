/**
 * Custom hook that fetches calendar events and returns the events, loading state, and error message.
 * @returns An object containing the events, loading state, and error message.
 */
import { CalendarEvent } from '@/types/CalendarEvent';
import { useEffect, useState } from 'react';

const useEvents = () => {
  const initialDays: Date[] = [];
  const [events, setEvents] = useState<Date[]>(initialDays);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchEvents = async (): Promise<CalendarEvent[]> => {
    // API simulation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const dummyEvents: CalendarEvent[] = [
      { id: 1, title: 'Event 1', date: new Date('2023-08-11') },
      { id: 2, title: 'Event 2', date: new Date('2023-08-14') },
      { id: 3, title: 'Event 3', date: new Date('2023-08-17') },
    ];

    // We only get the events that are included in this month, this will be changed depending on the requirements

    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );

    const filteredEvents = dummyEvents.filter(
      (event) =>
        new Date(event.date) >= startOfMonth &&
        new Date(event.date) <= endOfMonth,
    );
    return filteredEvents;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEvents();
        const evts = response.map((event: CalendarEvent) => {
          return event.date;
        });
        setEvents(evts);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { events, isLoading, error };
};

export default useEvents;
