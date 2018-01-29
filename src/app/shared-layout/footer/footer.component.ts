import { Component, OnInit } from '@angular/core';
import { AppProvider } from '../../providers/app.provider';
import { CommonService } from '../../providers/common.service'

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    providers:[AppProvider,CommonService]
})

export class FooterComponent implements OnInit {
	aboutUsContent
    constructor(private appProvider:AppProvider,private commonService:CommonService) {
    }

    ngOnInit() {
    	this.getAboutUsData();
    }
    
    getAboutUsData(){
    	this.commonService.homePageContent().subscribe(data=>{
    		if (data.success=true) {
    			this.aboutUsContent=data.aboutUsData[0].about
    		}
    	},err=>{

    	})
    }

}
