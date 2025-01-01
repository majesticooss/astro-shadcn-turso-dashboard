import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

const storageKey = 'organization-storage';

// Function to get initial state from localStorage
const getInitialState = () => {
	if (typeof window === 'undefined') return null

	const stored = localStorage.getItem(storageKey)
	if (!stored) return null

	try {
		const data = JSON.parse(stored)
		return data.state
	} catch {
		return null
	}
}

export const useOrganizationStore = create<OrganizationState>()(
	persist(
		(set) => ({
			activeOrganization: getInitialState()?.activeOrganization || null,
			organizations: getInitialState()?.organizations || [],
			lastFetched: getInitialState()?.lastFetched || 0,
			setActiveOrganization: (org) => set({ activeOrganization: org }),
			setOrganizations: (orgs) => set({ organizations: orgs }),
			setLastFetched: () => set({ lastFetched: Date.now() }),
			hasHydrated: false,
			setHasHydrated: (state) => set({ hasHydrated: state }),
		}),
		{
			name: storageKey,
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		}
	)
)
