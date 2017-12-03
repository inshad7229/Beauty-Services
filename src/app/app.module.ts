import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import  {FormsModule} from '@angular/forms'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TestService} from './test.service'
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
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TestService,AppProvider,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
