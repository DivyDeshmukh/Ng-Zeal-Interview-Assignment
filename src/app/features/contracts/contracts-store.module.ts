import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { contractsFeatureKey, contractsReducer } from './state/data/contracts.reducer';
import { ContractsEffects } from './state/data/contracts.effects';


@NgModule({
  imports: [
    StoreModule.forFeature(contractsFeatureKey, contractsReducer),
    EffectsModule.forFeature([ContractsEffects]),
  ],
})
export class ContractsStoreModule {}
