import { createOrganizationDatabase } from "@/lib/db";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	try {
		const { slug, name } = await request.json();

		const database = await createOrganizationDatabase({ slug, name });

		return new Response(JSON.stringify(database));
	} catch (error) {
		console.error("Error creating organization database:", error);
		return new Response(
			JSON.stringify({ error: "Failed to create organization database" }),
			{ status: 500 }
		);
	}
};
