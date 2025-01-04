"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { Patient } from "./columns";

const patientSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(10, "Phone number is required"),
	dateOfBirth: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
	lastVisit: z.string().nullable(),
	nextAppointment: z.string().nullable(),
	status: z.enum(["active", "inactive"]).default("active"),
});

interface PatientDetailProps {
	patient?: Patient;
	isEditing?: boolean;
	onSubmit?: (data: Patient) => void;
}

export function PatientDetail({
	patient,
	isEditing = false,
	onSubmit,
}: PatientDetailProps) {
	const form = useForm<z.infer<typeof patientSchema>>({
		resolver: zodResolver(patientSchema),
		defaultValues: patient || {
			name: "",
			email: "",
			phone: "",
			dateOfBirth: "",
			lastVisit: null,
			nextAppointment: null,
			status: "active",
		},
	});

	const handleSubmit = (data: z.infer<typeof patientSchema>) => {
		onSubmit?.(data as Patient);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input disabled={!isEditing} {...field} />
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
										<Input disabled={!isEditing} type="date" {...field} />
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
										<Input disabled={!isEditing} {...field} />
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
										<Input disabled={!isEditing} {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					{!isEditing && (
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
					)}
				</div>
				{isEditing && (
					<div className="flex justify-end gap-4">
						<Button type="submit">Save Patient</Button>
					</div>
				)}
			</form>
		</Form>
	);
}
