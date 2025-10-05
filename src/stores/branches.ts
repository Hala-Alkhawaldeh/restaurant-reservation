import { defineStore } from 'pinia';
import { fetchBranches, updateBranch } from '../services/branchesService';
import type { Branch } from '../types/branch';

export const useBranchStore = defineStore('branch', {
  state: () => ({
    branches: [] as Branch[],
    loading: false,
    loadingMessage: 'Loading branches...' as string | null,
    error: null as string | null,
  }),
  actions: {
    async loadBranches(page = 1, perPage = 50) {
      this.error = null
      try {
        const res = await fetchBranches(page, perPage)
        this.branches = res.data
        return {
          meta: res.meta,
          links: res.links
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch branches'
        return {
          meta: null,
          links: null
        }
      }
    },
    async enableReservation(branchId: string) {
      this.loading = true;
      try {
        await updateBranch(branchId, { accepts_reservations: true });
        await this.loadBranches();
      } catch (err: any) {
        this.error = err.message || 'Failed to enable reservation';
      }
    },

    async disableReservation(branchId: string) {
      try {
        await updateBranch(branchId, { accepts_reservations: false });
        // await this.loadBranches();
      } catch (err: any) {
        this.error =  err.response.data.message || err.message || 'Failed to disable reservation';
      }
    },

    async updateReservationSettings(branchId: string, payload: Partial<Branch>) {
      try {
        this.loading = true;
        this.loadingMessage = 'Updating reservation settings...';
        await updateBranch(branchId, payload);
        await this.loadBranches();
        this.loading = false;
      } catch (err: any) {
        this.loading = false;
        this.loadingMessage = null;
        this.error = err.response.data.message || err.message || 'Failed to update reservation settings';
      }
    },
  },
});
