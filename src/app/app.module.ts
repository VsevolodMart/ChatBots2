import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppBootstrapModule } from './app.bootstrap.module';
import { AppComponent } from './app.component';
import { ChatbotsService } from '../services/chatbots.service';
import { MainContentComponent } from './main-content/main-content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MessagesComponent } from './main-content/messages/messages.component';
import { SendComponent } from './main-content/send/send.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    SidebarComponent,
    MessagesComponent,
    SendComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    PerfectScrollbarModule,
    BrowserModule,
    AppBootstrapModule
  ],
  providers: [ChatbotsService, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent,MessagesComponent]
})
export class AppModule { }
