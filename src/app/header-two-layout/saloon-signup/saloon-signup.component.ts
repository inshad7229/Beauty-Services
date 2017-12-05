import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
declare var $
@Component({
    selector: 'app-saloon-signup',
    templateUrl: './saloon-signup.component.html',
    styleUrls: ['./saloon-signup.component.scss']
})
export class SaloonSignupComponent implements OnInit {
	 reactiveForm: FormGroup;
    constructor(public router: Router, private fb: FormBuilder,) {
       this.reactiveForm = fb.group({
            'loginAs': [null, Validators.compose([Validators.required])],
            
        }) 
    }

    ngOnInit() {

    
			        
    }
}
