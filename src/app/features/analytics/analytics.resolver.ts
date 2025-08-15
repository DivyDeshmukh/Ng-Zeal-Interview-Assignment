import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Act from '../contracts/state/data/contracts.actions';
import { of } from 'rxjs';

export const analyticsBootstrapResolver: ResolveFn<boolean> = () => {
  const store = inject(Store);

  store.dispatch(Act.filtersChanged({ filters: { page: 0, size: 500, sort: 'endDate,asc' } }));
  return of(true);
};
