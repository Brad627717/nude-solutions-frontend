import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InsuredItemComponent } from './insured-item/insured-item.component';
import { ShowInsuredItemComponent } from './insuredItem/show-insured-item/show-insured-item.component';
import { AddEditInsuredItemComponent } from './insuredItem/add-edit-insured-item/add-edit-insured-item.component';
import { InsuredItemApiService } from './insured-item-api.service';

@NgModule({
  declarations: [
    AppComponent,
    InsuredItemComponent,
    ShowInsuredItemComponent,
    AddEditInsuredItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [InsuredItemApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
