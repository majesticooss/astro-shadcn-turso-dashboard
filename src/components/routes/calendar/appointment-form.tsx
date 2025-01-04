import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Mock data for doctors and staff
const mockDoctors = [
	{ id: "d1", name: "Dr. Smith" },
	{ id: "d2", name: "Dr. Johnson" },
	{ id: "d3", name: "Dr. Williams" },
];

const mockStaff = [
	{ id: "s1", name: "Jane Assistant" },
	{ id: "s2", name: "John Hygienist" },
	{ id: "s3", name: "Mary Assistant" },
];

const mockProcedures = [
	"Dental Cleaning",
	"Root Canal",
	"Filling",
	"Crown",
	"Extraction",
	"Check-up",
];

const formSchema = z.object({
	patientName: z.string().min(1, "Patient name is required"),
	patientEmail: z.string().email("Invalid email address"),
	patientPhone: z.string().min(1, "Phone number is required"),
	referentDoctor: z.string().min(1, "Referent doctor is required"),
	assistingStaff: z
		.string()
		.array()
		.min(1, "At least one staff member is required"),
	procedure: z.string().min(1, "Procedure is required"),
	notes: z.string().optional(),
	date: z.string(),
	startTime: z.string(),
	endTime: z.string(),
	chairId: z.string(),
});

interface AppointmentFormProps {
	appointment: any;
	isNew: boolean;
	onSubmit: (data: z.infer<typeof formSchema>) => void;
	onCancel: () => void;
}

export function AppointmentForm({
	appointment,
	isNew,
	onSubmit,
	onCancel,
}: AppointmentFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			patientName: appointment?.patient?.name || "",
			patientEmail: appointment?.patient?.email || "",
			patientPhone: appointment?.patient?.phone || "",
			referentDoctor: appointment?.referentDoctor?.id || "",
			assistingStaff: appointment?.assistingStaff?.map((s: any) => s.id) || [],
			procedure: appointment?.procedure || "",
			notes: appointment?.notes || "",
			date: new Date(appointment?.start || Date.now())
				.toISOString()
				.split("T")[0],
			startTime: new Date(appointment?.start || Date.now())
				.toISOString()
				.split("T")[1]
				.slice(0, 5),
			endTime: new Date(appointment?.end || Date.now())
				.toISOString()
				.split("T")[1]
				.slice(0, 5),
			chairId: appointment?.resourceId || "",
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					{/* Patient Information */}
					<FormField
						control={form.control}
						name="patientName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Patient Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="patientEmail"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="patientPhone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input type="tel" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Appointment Details */}
					<FormField
						control={form.control}
						name="procedure"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Procedure</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select procedure" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{mockProcedures.map((procedure) => (
											<SelectItem key={procedure} value={procedure}>
												{procedure}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="referentDoctor"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Referent Doctor</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select doctor" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{mockDoctors.map((doctor) => (
											<SelectItem key={doctor.id} value={doctor.id}>
												{doctor.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date</FormLabel>
								<FormControl>
									<Input type="date" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="startTime"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Start Time</FormLabel>
								<FormControl>
									<Input type="time" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="endTime"
						render={({ field }) => (
							<FormItem>
								<FormLabel>End Time</FormLabel>
								<FormControl>
									<Input type="time" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="notes"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end space-x-2 mt-6">
					<Button variant="outline" onClick={onCancel} type="button">
						Cancel
					</Button>
					<Button type="submit">
						{isNew ? "Create Appointment" : "Update Appointment"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
