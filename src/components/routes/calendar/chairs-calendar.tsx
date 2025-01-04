import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import type { EventClickArg } from "@fullcalendar/core";
import { useCallback, useState } from "react";
import { AppointmentForm } from "./appointment-form";
import { CalendarScheduler } from "./calendar-scheduler";

interface Staff {
	id: string;
	name: string;
	role: "DOCTOR" | "ASSISTANT" | "HYGIENIST";
}

interface Patient {
	id: string;
	name: string;
	phone: string;
	email: string;
}

interface Appointment {
	id: string;
	title: string;
	start: string;
	end: string;
	resourceId: string; // chairId
	patient: Patient;
	referentDoctor: Staff;
	assistingStaff: Staff[];
	notes?: string;
	procedure?: string;
}

// Mock data
const mockChairs = [
	{ id: "chair1", title: "Chair 1" },
	{ id: "chair2", title: "Chair 2" },
	{ id: "chair3", title: "Chair 3" },
	{ id: "chair4", title: "Chair 4" },
];

const TODAY = new Date();
const mockAppointments: Appointment[] = [
	{
		id: "1",
		title: "John Doe - Cleaning",
		start: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			9,
			0,
		).toISOString(),
		end: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			10,
			0,
		).toISOString(),
		resourceId: "chair1",
		patient: {
			id: "p1",
			name: "John Doe",
			phone: "123-456-7890",
			email: "john@example.com",
		},
		referentDoctor: {
			id: "d1",
			name: "Dr. Smith",
			role: "DOCTOR",
		},
		assistingStaff: [
			{
				id: "s1",
				name: "Jane Assistant",
				role: "ASSISTANT",
			},
		],
		procedure: "Dental Cleaning",
		notes: "Regular checkup and cleaning",
	},
	{
		id: "2",
		title: "Alice Smith - Root Canal",
		start: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			11,
			0,
		).toISOString(),
		end: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			12,
			30,
		).toISOString(),
		resourceId: "chair2",
		patient: {
			id: "p2",
			name: "Alice Smith",
			phone: "234-567-8901",
			email: "alice@example.com",
		},
		referentDoctor: {
			id: "d2",
			name: "Dr. Johnson",
			role: "DOCTOR",
		},
		assistingStaff: [
			{
				id: "s2",
				name: "John Hygienist",
				role: "HYGIENIST",
			},
		],
		procedure: "Root Canal",
		notes: "Upper right molar",
	},
	{
		id: "3",
		title: "Bob Wilson - Crown",
		start: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			14,
			0,
		).toISOString(),
		end: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			15,
			30,
		).toISOString(),
		resourceId: "chair3",
		patient: {
			id: "p3",
			name: "Bob Wilson",
			phone: "345-678-9012",
			email: "bob@example.com",
		},
		referentDoctor: {
			id: "d3",
			name: "Dr. Williams",
			role: "DOCTOR",
		},
		assistingStaff: [
			{
				id: "s1",
				name: "Jane Assistant",
				role: "ASSISTANT",
			},
			{
				id: "s3",
				name: "Mary Assistant",
				role: "ASSISTANT",
			},
		],
		procedure: "Crown",
		notes: "Final fitting",
	},
	{
		id: "4",
		title: "Carol Brown - Extraction",
		start: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			9,
			30,
		).toISOString(),
		end: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			10,
			30,
		).toISOString(),
		resourceId: "chair4",
		patient: {
			id: "p4",
			name: "Carol Brown",
			phone: "456-789-0123",
			email: "carol@example.com",
		},
		referentDoctor: {
			id: "d1",
			name: "Dr. Smith",
			role: "DOCTOR",
		},
		assistingStaff: [
			{
				id: "s2",
				name: "John Hygienist",
				role: "HYGIENIST",
			},
		],
		procedure: "Extraction",
		notes: "Wisdom tooth removal",
	},
	{
		id: "5",
		title: "David Lee - Check-up",
		start: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			15,
			0,
		).toISOString(),
		end: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			16,
			0,
		).toISOString(),
		resourceId: "chair1",
		patient: {
			id: "p5",
			name: "David Lee",
			phone: "567-890-1234",
			email: "david@example.com",
		},
		referentDoctor: {
			id: "d2",
			name: "Dr. Johnson",
			role: "DOCTOR",
		},
		assistingStaff: [
			{
				id: "s3",
				name: "Mary Assistant",
				role: "ASSISTANT",
			},
		],
		procedure: "Check-up",
		notes: "Regular check-up and X-rays",
	},
	{
		id: "6",
		title: "Emma Davis - Filling",
		start: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			16,
			30,
		).toISOString(),
		end: new Date(
			TODAY.getFullYear(),
			TODAY.getMonth(),
			TODAY.getDate(),
			17,
			30,
		).toISOString(),
		resourceId: "chair2",
		patient: {
			id: "p6",
			name: "Emma Davis",
			phone: "678-901-2345",
			email: "emma@example.com",
		},
		referentDoctor: {
			id: "d3",
			name: "Dr. Williams",
			role: "DOCTOR",
		},
		assistingStaff: [
			{
				id: "s1",
				name: "Jane Assistant",
				role: "ASSISTANT",
			},
		],
		procedure: "Filling",
		notes: "Two cavities to be filled",
	},
];

export function ChairsCalendar() {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isNewAppointment, setIsNewAppointment] = useState(false);
	const [newAppointmentData, setNewAppointmentData] =
		useState<Partial<Appointment> | null>(null);
	const [events, setEvents] = useState<Appointment[]>(mockAppointments);
	const [lastFetchTime, setLastFetchTime] = useState<number>(Date.now());

	const handleDateClick = (arg: { date: Date; resource?: { id: string } }) => {
		setIsNewAppointment(true);
		setNewAppointmentData({
			start: arg.date.toISOString(),
			end: new Date(arg.date.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour default
			resourceId: arg.resource?.id || "",
		});
		setIsDialogOpen(true);
	};

	const handleEventClick = (arg: EventClickArg) => {
		const appointment = mockAppointments.find((apt) => apt.id === arg.event.id);
		if (appointment) {
			setSelectedEvent(appointment);
			setIsNewAppointment(false);
			setIsDialogOpen(true);
		}
	};

	const handleEventDrop = (arg: any) => {
		toast({
			title: "Appointment Updated",
			description: "The appointment has been rescheduled.",
		});
	};

	const handleEventResize = (arg: any) => {
		toast({
			title: "Appointment Updated",
			description: "The appointment duration has been updated.",
		});
	};

	const getEvents = useCallback(async () => {
		// Only fetch if more than 5 seconds have passed since last fetch
		if (Date.now() - lastFetchTime > 5000) {
			setIsLoading(true);
			try {
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 500));
				setEvents(mockAppointments);
				setLastFetchTime(Date.now());
			} finally {
				setIsLoading(false);
			}
		}
		return events;
	}, [events, lastFetchTime]);

	const handleDatesSet = useCallback(() => {
		// Optional: Only fetch on date changes if needed
	}, []);

	return (
		<>
			<div>
				<CalendarScheduler
					resources={mockChairs}
					getCalendarEventsFromAPI={getEvents}
					setIsLoading={setIsLoading}
					handleDateClick={handleDateClick}
					handleEventClick={handleEventClick}
					handleEventResize={handleEventResize}
					handleEventDrop={handleEventDrop}
					handleDatesSet={handleDatesSet}
				/>
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>
							{isNewAppointment ? "New Appointment" : "Appointment Details"}
						</DialogTitle>
					</DialogHeader>
					<AppointmentForm
						appointment={isNewAppointment ? newAppointmentData : selectedEvent}
						isNew={isNewAppointment}
						onSubmit={(data) => {
							toast({
								title: isNewAppointment
									? "Appointment Created"
									: "Appointment Updated",
								description: "The changes have been saved successfully.",
							});
							setIsDialogOpen(false);
						}}
						onCancel={() => setIsDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
