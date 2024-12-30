import { updateUserRole, updateUsername } from "@/actions/auth/index";
import { createOrganization } from "@/actions/organization/index";

export const server = {
	updateUsername,
	updateUserRole,
	createOrganization,
};
