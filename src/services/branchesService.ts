import api from '../api/axios';
import type { Branch, BranchResponse } from '../types/branch';



export const fetchBranches = async (page = 1, perPage = 50): Promise<BranchResponse> => {
  const { data } = await api.get(
    `branches?include[0]=sections&include[1]=sections.tables&page=${page}&per_page=${perPage}`
  );
  return data;
};

export const updateBranch = async (id: string, payload: Partial<Branch>) => {
  const { data } = await api.put(`branches/${id}`, payload);
  return data;
};