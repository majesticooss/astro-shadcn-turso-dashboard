import { column, defineDb, defineTable } from "astro:db";

const User = defineTable({
	columns: {
		id: column.number({
			primaryKey: true,
			identity: true,
		}),
		email: column.text({ unique: true }),
		hashed_password: column.text(),
	},
});

const Session = defineTable({
	columns: {
		id: column.text({
			primaryKey: true,
		}),
		expiresAt: column.date(),
		userId: column.number({
			references: () => User.columns.id,
		}),
	},
});

const Tenant = defineTable({
	columns: {
		id: column.number({
			primaryKey: true,
			identity: true,
		}),
		name: column.text(),
	},
});

const UserTenant = defineTable({
	columns: {
		id: column.number({
			primaryKey: true,
			identity: true,
		}),
		userId: column.number({
			references: () => User.columns.id,
		}),
		tenantId: column.number({
			references: () => Tenant.columns.id,
		}),
	},
	indexes: {
		userTenantUnique: {
			on: ["userId", "tenantId"],
			unique: true,
		},
	},
});

export default defineDb({
	tables: {
		User,
		Session,
		Tenant,
		UserTenant,
	},
});
