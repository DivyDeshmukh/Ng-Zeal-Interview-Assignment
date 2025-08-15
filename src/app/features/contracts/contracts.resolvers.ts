import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, map, filter, take, tap } from 'rxjs';
import * as Act from './state/data/contracts.actions';
import { selectContractById } from './state/data/contracts.selector'; // keep your singular file name

// Prefetch list on /contracts
export const contractsBootstrapResolver: ResolveFn<boolean> = () => {
  const store = inject(Store);
  store.dispatch(Act.enterList());
  return of(true); // let component rende effect will fetch
};


export const contractByIdResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);
  const id = route.paramMap.get('id')!;
  return store.select(selectContractById(id)).pipe(
    tap(c => { if (!c) store.dispatch(Act.loadById({ id })); }),
    filter(Boolean),
    take(1),
    map(() => true)
  );
};
