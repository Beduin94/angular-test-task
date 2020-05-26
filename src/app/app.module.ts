import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShopsComponent } from './shops/shops.component';
import { SpecialistsComponent } from './specialists/specialists.component';
import { SaveFormComponent } from './save-form/save-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopsComponent,
    SpecialistsComponent,
    SaveFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
