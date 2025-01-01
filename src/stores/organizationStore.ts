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
		(set) => ({
			activeOrganization: null,
			organizations: [],
			lastFetched: 0,
			setActiveOrganization: (org) => set({ activeOrganization: org }),
			setOrganizations: (orgs) => set({ organizations: orgs }),
			setLastFetched: () => set({ lastFetched: Date.now() }),
		}),
		{
			name: 'organization-storage',
		}
	)
)
