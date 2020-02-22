import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/epics/users.effects';
import { DataService } from './shared/data.service';
import { UsersService } from './services/users.service';
import { ConfigService } from './shared/config.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({ users: reducer }),
    EffectsModule.forRoot([UsersEffects]),
  ],
  providers: [
    ConfigService,
    DataService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
