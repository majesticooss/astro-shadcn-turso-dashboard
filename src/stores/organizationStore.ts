import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OrganizationState {
	activeOrganization: Organization | null
	organizations: Organization[]
	lastFetched: number
	setActiveOrganization: (org: Organization | null) => void
	setOrganizations: (orgs: Organization[]) => void
	setLastFetched: () => void
}

export const useOrganizationStore = create<OrganizationState>()(
	persist(
		(set, get) => ({
			activeOrganization: get()?.activeOrganization,
			organizations: get()?.organizations,
			lastFetched: get()?.lastFetched,
			setActiveOrganization: (org) => set({ activeOrganization: org }),
			setOrganizations: (orgs) => set({ organizations: orgs }),
			setLastFetched: () => set({ lastFetched: Date.now() }),
		}),
		{
			name: 'organization-storage', // name of the item in the storage (must be unique)
		},
	),
)
