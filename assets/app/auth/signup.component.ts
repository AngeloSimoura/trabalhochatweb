import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "./user.services";
import { User } from './user.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
    providers: [UserService]

})

export class SignupComponent implements OnInit{
    constructor(private userService: UserService){}   

    myForm : FormGroup;

    onSubmit(){
        console.log(this.myForm);
        //this.myForm.reset();
        const userAux = new User(this.myForm.value.emailTS,this.myForm.value.passwordTS,this.myForm.value.firstNameTS,this.myForm.value.lastNameTS);
        console.log(userAux);
        this.userService.addUser(userAux);
        
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            firstNameTS: new FormControl(null, Validators.required),
            lastNameTS: new FormControl(null, Validators.required),
            emailTS: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            passwordTS: new FormControl(null, Validators.required)
        }); 
    }  
}