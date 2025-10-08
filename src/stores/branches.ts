import { defineStore } from 'pinia';
import type { Branch } from '../types/branch';
import { fetchBranches, updateBranch } from '@/services/branchesService';
import { useSnackbar } from '@/composables/useSnackbar';

export const useBranchStore = defineStore('branch', {
  state: () => ({
    branches: [] as Branch[],
    open_reservations_branches: [] as Branch[],
    loading: false,
    error: null as string | null,
    loadingMessage: 'Loading branches...',
    meta: null as any,
    links: null as any,
    filters: {} as Record<string, any>,
  }),
  actions: {
    async loadBranches(page = 1, perPage = 50, filters = this.filters) {
      const { showError } = useSnackbar();
      this.loading = true;
      this.error = null;
      

      const data = await fetchBranches(page, perPage ,  filters);
      if (data) {
        this.branches = data.data;
        this.open_reservations_branches = this.branches.filter(branch => branch.accepts_reservations);
        this.meta = data.meta;
        this.links = data.links;
        return {
          branches: this.branches,
          meta: this.meta,
          links: this.links,
        }
      } else {
        this.error = 'Failed to fetch branches';
        showError(this.error);
      }

      this.loading = false;
    },

    async enableReservation(branchId: string) {
      const { showSuccess, showError } = useSnackbar();

      const data = await updateBranch(branchId, { accepts_reservations: true });
      if (data) {
        showSuccess('Reservation enabled successfully!');
        // await this.loadBranches();
      } else {
        showError('Failed to enable reservation');
      }
    },

    async disableReservation(branchId: string) {
      const { showSuccess, showError } = useSnackbar();

      const data = await updateBranch(branchId, { accepts_reservations: false });
      if (data) {
        showSuccess('Reservation disabled successfully!');
        // await this.loadBranches();
      } else {
        showError('Failed to disable reservation');
      }
    },

    async updateReservationSettings(branchId: string, payload: Partial<Branch>) {
      const { showSuccess, showError } = useSnackbar();

      const data = await updateBranch(branchId, payload);
      if (data) {
        showSuccess('Reservation settings updated successfully!');
        await this.loadBranches();
      } else {
        showError('Failed to update reservation settings');
      }
    },
    setFilters(filters: Record<string, any>) {
      this.filters = filters;
    },
  },
});
