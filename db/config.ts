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
		phoneNumber: column.text({ unique: true, optional: true }),
		phoneNumberVerified: column.boolean({ optional: true }),
		role: column.text({ optional: true }),
		banned: column.boolean({ optional: true }),
		banReason: column.text({ optional: true }),
		banExpires: column.date({ optional: true }),
		twoFactorEnabled: column.boolean({ optional: true }),
	},
});

const Session = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		expiresAt: column.date(),
		token: column.text({ unique: true }),
		createdAt: column.date(),
		updatedAt: column.date(),
		ipAddress: column.text({ optional: true }),
		userAgent: column.text({ optional: true }),
		userId: column.text({
			references: () => User.columns.id,
		}),
		activeOrganizationId: column.text({ optional: true }),
		impersonatedBy: column.text({ optional: true }),
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
		updatedAt: column.date(),
	},
});

const Organization = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		name: column.text(),
		slug: column.text({ unique: true }),
		logo: column.text({ optional: true }),
		createdAt: column.date(),
		metadata: column.text({ optional: true }),
	},
});

const Member = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		organizationId: column.text({
			references: () => Organization.columns.id,
		}),
		userId: column.text({
			references: () => User.columns.id,
		}),
		role: column.text(),
		createdAt: column.date(),
	},
});

const Invitation = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		organizationId: column.text({
			references: () => Organization.columns.id,
		}),
		email: column.text(),
		role: column.text(),
		status: column.text(),
		expiresAt: column.date(),
		inviterId: column.text({
			references: () => User.columns.id,
		}),
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
		Organization,
		Member,
		Invitation,
		TwoFactor,
	},
});
