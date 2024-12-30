import fs from 'node:fs/promises';
import path from 'node:path';
import { createClient } from "@tursodatabase/api";

// biome-ignore lint/suspicious/noExplicitAny: Turso client type is not exported from the package
let turso: any;
if (import.meta.env.PROD) {
	turso = createClient({
		org: import.meta.env.APP_ORGANIZATION,
		token: import.meta.env.ASTRO_DB_APP_TOKEN,
	});
}

const LOCAL_DB_PATH = './.astro/organizations';

// Define interface for database response
interface DatabaseResponse {
	url: string;
	dbName: string;
	authToken?: string;
	id?: string;
	hostname?: string;
	name?: string;
}

export async function getOrganizationDb(organization: { metadata?: string }) {
	if (!organization.metadata) {
		throw new Error("Organization database not configured");
	}
	const metadata = JSON.parse(organization.metadata);

	if (import.meta.env.DEV) {
		// For local development, use file-based SQLite database
		const dbPath = path.join(LOCAL_DB_PATH, `${metadata.dbName}.db`);
		return {
			url: `file:${dbPath}`,
			// No auth token needed for local development
		};
	}

	// For production, use remote database
	if (!metadata.dbUrl || !metadata.dbAuthToken) {
		throw new Error("Organization database configuration invalid");
	}

	const database = await turso.databases.get(metadata.dbUrl);
	return database;
}

// Helper to create organization database
export async function createOrganizationDatabase(organization: { slug: string; name: string }): Promise<DatabaseResponse> {
	if (import.meta.env.DEV) {
		try {
			// For local development, create a new SQLite file
			await fs.mkdir(LOCAL_DB_PATH, { recursive: true });
			const dbPath = path.join(LOCAL_DB_PATH, `${organization.slug}.db`);

			// You might want to initialize the database schema here
			// For example, using your schema migrations

			return {
				url: `file:${dbPath}`,
				dbName: organization.slug,
				// Return mock values that match the production Turso response structure
				id: `local-${organization.slug}`,
				hostname: `local-${organization.slug}`,
				name: organization.name
			};
		}
		catch (error) {
			console.error("Error creating organization database:", error);
			throw error;
		}

	}

	// For production, create remote database
	const database = await turso.databases.create(organization.slug, {
		group: import.meta.env.APP_GROUP || "default",
	});

	return {
		...database,
		dbName: organization.slug
	};
}
