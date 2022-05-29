import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormSearchComponent } from './core/shared/components/form-search/form-search.component';
import { HeaderComponent } from './core/shared/components/header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FormSearchComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
