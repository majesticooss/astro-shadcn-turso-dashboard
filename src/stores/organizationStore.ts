import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface OrganizationState {
	activeOrganization: Organization | null
	organizations: Organization[]
	lastFetched: number
	setActiveOrganization: (org: Organization | null) => void
	setOrganizations: (orgs: Organization[]) => void
	setLastFetched: () => void
	hasHydrated: boolean;
	setHasHydrated: (state: boolean) => void;
}

export const useOrganizationStore = create<OrganizationState>()(
	persist(
		(set, get) => ({
			activeOrganization: null,
			organizations: [],
			lastFetched: 0,
			setActiveOrganization: (org) => set({ activeOrganization: org }),
			setOrganizations: (orgs) => set({ organizations: orgs }),
			setLastFetched: () => set({ lastFetched: Date.now() }),
			hasHydrated: false,
			setHasHydrated: (state) => set({ hasHydrated: state }),
		}),
		{
			name: 'organization-storage',
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		},
	),
)
