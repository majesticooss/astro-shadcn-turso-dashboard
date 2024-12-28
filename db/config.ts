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
		phoneNumber: column.text({ optional: true }),
		phoneNumberVerified: column.boolean({ optional: true }),
	},
});

const Session = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		userId: column.text({
			references: () => User.columns.id,
		}),
		token: column.text(),
		expiresAt: column.date(),
		ipAddress: column.text({ optional: true }),
		userAgent: column.text({ optional: true }),
		createdAt: column.date(),
		updatedAt: column.date(),
		activeOrganizationId: column.text({
			optional: true,
			references: () => Organization.columns.id,
		}),
	},
});

const Account = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		userId: column.text({
			references: () => User.columns.id,
		}),
		accountId: column.text(),
		providerId: column.text(),
		accessToken: column.text({ optional: true }),
		refreshToken: column.text({ optional: true }),
		accessTokenExpiresAt: column.date({ optional: true }),
		refreshTokenExpiresAt: column.date({ optional: true }),
		scope: column.text({ optional: true }),
		password: column.text({ optional: true }),
		createdAt: column.date(),
		updatedAt: column.date(),
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
		userId: column.text({
			references: () => User.columns.id,
		}),
		secret: column.text(),
		backupCodes: column.text(),
		createdAt: column.date(),
		updatedAt: column.date(),
		lastUsedAt: column.date({ optional: true }),
		verifiedAt: column.date({ optional: true }),
	},
});

const Organization = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		name: column.text(),
		slug: column.text({ unique: true }),
		logo: column.text({ optional: true }),
		metadata: column.text({ optional: true }),
		createdAt: column.date(),
	},
});

const Member = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		userId: column.text({
			references: () => User.columns.id,
		}),
		organizationId: column.text({
			references: () => Organization.columns.id,
		}),
		role: column.text(),
		createdAt: column.date(),
	},
});

const Invitation = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		email: column.text(),
		organizationId: column.text({
			references: () => Organization.columns.id,
		}),
		role: column.text(),
		status: column.text(),
		expiresAt: column.date(),
		createdAt: column.date(),
	},
});

const OTP = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		phoneNumber: column.text(),
		code: column.text(),
		expiresAt: column.date(),
		createdAt: column.date(),
		verified: column.boolean(),
		type: column.text(),
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
		Organization,
		 Member,
		Invitation,
		OTP,
	},
});
