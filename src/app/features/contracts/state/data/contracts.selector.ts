import { createFeatureSelector, createSelector } from "@ngrx/store";
import { contractsFeatureKey, ContractsState } from "./contracts.reducer";

export const selectorContractsState = createFeatureSelector<ContractsState>(contractsFeatureKey);

// Table Data (current page)
export const selectContractsList = createSelector(selectorContractsState, s => s.list);
export const selectTotalCount = createSelector(selectorContractsState, s => s.total);
export const selectLoading = createSelector(selectorContractsState, s => s.loading);
export const selectCache = createSelector(selectorContractsState, s => s.cache);

// Fast byId (O(1) from caches; falls back to current page if missing)
export const selectContractById = (id: string) => createSelector(
    selectorContractsState,
    (s) => s.cache[id] ?? s.list.find(c => c.id === id)
);

// Dashboard Summary
export const selectSummary = createSelector(selectorContractsState, s => s.summary);
export const selectSummaryLoading = createSelector(selectorContractsState, s => s.loading);
export const selectSummaryError = createSelector(selectorContractsState, s => s.summaryError);

// Dashboard KPIs
export const selectTotalSignedCount = createSelector(selectSummary, sm => sm?.totalSignedCount ?? 0);
export const selectTotalSignedValue = createSelector(selectSummary, sm => sm?.totalSignedValue ?? 0);
export const selectExpiringIn30Days = createSelector(selectSummary, sm => sm?.expiringIn30Days ?? 0);

// Dashboard Charts
export const selectCountByStatus = createSelector(selectSummary, sm => sm?.countByStatus ?? {});
export const selectTopPartiesByCount = createSelector(
  selectSummary,
  sm => (sm?.topPartiesByCount ?? []).map(p => [p.party, p.count] as [string, number])
);
