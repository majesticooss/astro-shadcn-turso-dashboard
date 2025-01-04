"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import type { Patient } from "./columns";

interface PatientDetailProps {
	patient: Patient;
}

export function PatientDetail({ patient }: PatientDetailProps) {
	const form = useForm({
		defaultValues: patient,
	});

	return (
		<Form {...form}>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input disabled {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dateOfBirth"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date of Birth</FormLabel>
								<FormControl>
									<Input disabled {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input disabled {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input disabled {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="lastVisit"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Visit</FormLabel>
								<FormControl>
									<Input disabled value={field.value || "No visits yet"} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="nextAppointment"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Next Appointment</FormLabel>
								<FormControl>
									<Input
										disabled
										value={field.value || "No appointment scheduled"}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
			</div>
		</Form>
	);
}
