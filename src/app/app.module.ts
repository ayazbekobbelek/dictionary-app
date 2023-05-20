import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { WordService } from './services/words.service';
import { YandexApiService } from './services/yandex-api.service';
import { HomeComponent } from './components/home/home.component';
import { WordDetailComponent } from './components/word-detail/word-detail.component';
import {MatButtonModule} from "@angular/material/button";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WordDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    WordService,
    YandexApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
