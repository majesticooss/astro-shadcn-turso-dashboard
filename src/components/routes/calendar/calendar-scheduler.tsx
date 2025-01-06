import { useToast } from "@/hooks/use-toast";
import type { EventClickArg, EventDropArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { useCallback, useEffect, useRef } from "react";
import styles from "./calendar.module.css";

// Define types for the resources and events
interface Resource {
	id: string;
	title: string;
	color?: string;
	eventColor?: string;
	children?: Resource[];
}

interface CalendarEvent {
	id: string;
	title: string;
	start: string | Date;
	end: string | Date;
	resourceId: string;
	color?: string;
	backgroundColor?: string;
	extendedProps?: Record<string, unknown>;
}

interface CalendarSchedulerProps {
	initialDate?: Date;
	resources: Resource[];
	getCalendarEventsFromAPI: () => Promise<CalendarEvent[]>;
	setIsLoading: (loading: boolean) => void;
	handleDateClick: (arg: { date: Date; resource?: Resource }) => void;
	handleEventClick: (arg: EventClickArg) => void;
	handleEventResize: (arg: any) => void;
	handleEventDrop: (arg: EventDropArg) => void;
	handleDatesSet: (arg: {
		start: Date;
		end: Date;
		view: {
			type: string;
			title: string;
			currentStart: Date;
			currentEnd: Date;
		};
	}) => void;
}

export function CalendarScheduler({
	initialDate = new Date(),
	resources,
	getCalendarEventsFromAPI,
	setIsLoading,
	handleDateClick,
	handleEventClick,
	handleEventResize,
	handleEventDrop,
	handleDatesSet,
}: CalendarSchedulerProps) {
	const { toast } = useToast();
	const calendarRef = useRef<FullCalendar>(null);
	const fetchTimeoutRef = useRef<NodeJS.Timeout>();

	// Add debouncedDatesSet to prevent multiple rapid fetches
	const debouncedDatesSet = useCallback(
		(arg: any) => {
			if (fetchTimeoutRef.current) {
				clearTimeout(fetchTimeoutRef.current);
			}
			fetchTimeoutRef.current = setTimeout(() => {
				handleDatesSet(arg);
			}, 300);
		},
		[handleDatesSet],
	);

	useEffect(() => {
		return () => {
			if (fetchTimeoutRef.current) {
				clearTimeout(fetchTimeoutRef.current);
			}
		};
	}, []);

	return (
		<div className={styles.calendarWrapper}>
			<FullCalendar
				ref={calendarRef}
				plugins={[resourceTimeGridPlugin, interactionPlugin]}
				initialView="resourceTimeGridDay"
				resources={resources}
				events={getCalendarEventsFromAPI}
				eventSourceFailure={(error) =>
					toast({
						variant: "destructive",
						title: "Error",
						description: "Error loading calendar events",
					})
				}
				loading={setIsLoading}
				dateClick={handleDateClick}
				eventClick={handleEventClick}
				eventResize={handleEventResize}
				eventDrop={handleEventDrop}
				datesSet={debouncedDatesSet}
				nowIndicator={true}
				editable={true}
				allDaySlot={false}
				slotMinTime="07:00:00"
				slotMaxTime="23:00:00"
				headerToolbar={{
					left: "prev,next today",
					center: "title",
					right: "resourceTimeGridDay,resourceTimeGridWeek",
				}}
				initialDate={initialDate}
				viewDidMount={() => calendarRef.current?.getApi().gotoDate(new Date())}
				schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
			/>
		</div>
	);
}
