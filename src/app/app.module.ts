import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state/reducers';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ContractsStoreModule } from './features/contracts/contracts-store.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: { strictActionImmutability: true, strictStateImmutability: true },
    }),
    EffectsModule.forRoot([]), 
    CoreModule,  
    SharedModule,
    ContractsStoreModule                     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
