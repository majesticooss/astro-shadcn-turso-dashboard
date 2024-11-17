// https://5-0-0-beta.docs.astro.build/en/guides/astro-db/

import { column, defineDb, defineTable } from "astro:db";

const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		name: column.text(),
		email: column.text({ unique: true }),
		emailVerified: column.boolean(),
		image: column.text({ optional: true }),
		createdAt: column.date(),
		updatedAt: column.date(),
		twoFactorEnabled: column.boolean({ optional: true }),
	},
});

const Session = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		expiresAt: column.date(),
		ipAddress: column.text({ optional: true }),
		userAgent: column.text({ optional: true }),
		userId: column.text({
			references: () => User.columns.id,
		}),
	},
});

const Account = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		accountId: column.text(),
		providerId: column.text(),
		userId: column.text({
			references: () => User.columns.id,
		}),
		accessToken: column.text({ optional: true }),
		refreshToken: column.text({ optional: true }),
		idToken: column.text({ optional: true }),
		expiresAt: column.date({ optional: true }),
		password: column.text({ optional: true }),
	},
});

const Verification = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		identifier: column.text(),
		value: column.text(),
		expiresAt: column.date(),
		createdAt: column.date(),
	},
});

const Passkey = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		name: column.text({ optional: true }),
		publicKey: column.text(),
		userId: column.text({
			references: () => User.columns.id,
		}),
		webauthnUserID: column.text(),
		counter: column.number(),
		deviceType: column.text(),
		backedUp: column.boolean(),
		transports: column.text({ optional: true }),
		createdAt: column.date(),
	},
});

const TwoFactor = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		secret: column.text(),
		backupCodes: column.text(),
		userId: column.text({
			references: () => User.columns.id,
		}),
	},
});

export default defineDb({
	tables: {
		User,
		Session,
		Account,
		Verification,
		Passkey,
		TwoFactor,
	},
});
