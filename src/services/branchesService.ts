import { useApiFetch } from '@/composables/useApiFetch';
import type { Branch, BranchResponse } from '../types/branch';


export const fetchBranches = async (
  page = 1,
  perPage = 50,
  filters: Record<string, any> = {}
): Promise<BranchResponse | null> => {

  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    'include[0]': 'sections',
    'include[1]': 'sections.tables',
  });

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined)
      params.append(`filter[${key}]`, String(value));
  });

  const url = `branches?${params.toString()}`;

  const { data, error } = await useApiFetch<BranchResponse>(url, { method: 'GET' });

  if (error) {
    console.error('Failed to fetch branches:', error.message);
    return null;
  }

  return data;
};

export const updateBranch = async (id: string, payload: Partial<Branch>): Promise<Branch | null> => {
  const { data, error } = await useApiFetch<Branch>(
    `branches/${id}`,
    { method: 'PUT', data: payload }
  );

  if (error) {
    console.error(`Failed to update branch ${id}:`, error.message);
    return null;
  }

  return data;
};
