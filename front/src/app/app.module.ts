import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { BaseModule } from 'app/base/base.module';
import { SharedModule } from 'app/shared/shared.module';
import { ProductsAdminComponent } from './product/products-admin/products-admin.component';
import { ProductsComponent } from './product/products/products.component';
import { DataViewModule } from 'primeng/dataview';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [AppComponent, ProductsAdminComponent, ProductsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    BaseModule,
    DataViewModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    RippleModule,
    RatingModule,
    PaginatorModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' }
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEn, 'en');
  }
}
