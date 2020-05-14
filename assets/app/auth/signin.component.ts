import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "./user.services";
import { User } from './user.model';


@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    providers: [UserService]
})

export class SigninComponent{
    constructor(private userService: UserService){} 

    myForm : FormGroup;

    onSubmit(){        
        console.log(this.myForm);        
        this.userService.getUser(this.myForm.value.emailTS, this.myForm.value.passwordTS)
            .subscribe(
                dadosSucesso => console.log(dadosSucesso),
                dadosErro => console.log(dadosErro)
            );
        this.myForm.reset();
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            emailTS: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            passwordTS: new FormControl(null, Validators.required)
        }); 
    }  
}