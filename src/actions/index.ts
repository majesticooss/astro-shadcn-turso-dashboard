import { updateUserRole, updateUsername } from "@/actions/auth/index";
import { uploadOrganizationLogo } from "@/actions/organization/index";

export const server = {
	updateUsername,
	updateUserRole,
	uploadOrganizationLogo,
};
