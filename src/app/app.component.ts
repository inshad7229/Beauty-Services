import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private translate: TranslateService){
  	this.translate.use('en');
 // 	 localStorage['userdetails']='null'
	// localStorage['customerdetails']='null'
  }
}
