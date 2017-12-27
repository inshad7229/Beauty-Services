import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import  {FormsModule} from '@angular/forms'
import {MatSelectModule} from '@angular/material/select';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppProvider} from './providers/app.provider';
import { NotfoundComponent } from './notfound/notfound.component';
import {AuthGuard} from './guard/auth.guard'
import {FooterComponent} from './shared-layout/footer/footer.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


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
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
    FormsModule,
    MatSelectModule
  ],
  providers: [AppProvider,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
