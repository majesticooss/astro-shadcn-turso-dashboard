import { useToast } from "@/hooks/use-toast";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef } from "react";
import styles from "./calendar.module.css";

interface CalendarProps {
	initialDate?: Date;
	getCalendarEventsFromAPI: () => Promise<any>;
	setIsLoading: (loading: boolean) => void;
	handleDateClick: (arg: any) => void;
	handleEventClick: (arg: any) => void;
	handleEventResize: (arg: any) => void;
	handleEventDrop: (arg: any) => void;
	handleDatesSet: (arg: any) => void;
}

export function Calendar({
	initialDate = new Date(),
	getCalendarEventsFromAPI,
	setIsLoading,
	handleDateClick,
	handleEventClick,
	handleEventResize,
	handleEventDrop,
	handleDatesSet,
}: CalendarProps) {
	const { toast } = useToast();
	const calendarRef = useRef<any>(null);

	return (
		<div className={styles.calendarWrapper}>
			<FullCalendar
				ref={calendarRef}
				eventSourceFailure={(error) =>
					toast({
						variant: "destructive",
						title: "Error",
						description: "Error al cargar el calendario",
					})
				}
				events={getCalendarEventsFromAPI}
				loading={setIsLoading}
				dateClick={handleDateClick}
				eventClick={handleEventClick}
				eventResize={handleEventResize}
				eventDrop={handleEventDrop}
				nowIndicator={true}
				editable={true}
				allDaySlot={false}
				slotMinTime="07:00:00"
				slotMaxTime="23:00:00"
				initialView="timeGridWeek"
				headerToolbar={{
					left: "prev,next today",
					center: "title",
					right: "timeGridWeek,listMonth",
				}}
				plugins={[timeGridPlugin, listPlugin, interactionPlugin]}
				initialDate={initialDate}
				datesSet={handleDatesSet}
				viewDidMount={() => calendarRef.current?.getApi().gotoDate(new Date())}
			/>
		</div>
	);
}
