import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import  {FormsModule} from '@angular/forms'
import {MatSelectModule} from '@angular/material/select';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppProvider} from './providers/app.provider';
import { NotfoundComponent } from './notfound/notfound.component';
import {AuthGuard} from './guard/auth.guard'
import {FooterComponent} from './shared-layout/footer/footer.component'


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [AppProvider,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
