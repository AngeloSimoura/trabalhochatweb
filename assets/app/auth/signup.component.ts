import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "./user.services";
import { User } from './user.model';
import {Router} from "@angular/router"
var bcrypt = require('bcryptjs');


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    providers: [UserService]
})

export class SignupComponent implements OnInit{
    constructor(private userService: UserService,private router: Router){}   

    myForm : FormGroup;
    verificador: boolean = true;

    onSubmit(){
        console.log(this.myForm);
        const userAux = new User(this.myForm.value.emailTS,this.myForm.value.passwordTS,this.myForm.value.firstNameTS,this.myForm.value.lastNameTS);
        console.log(userAux);
        this.userService.addUser(userAux)
        .subscribe(
            dadosSucesso => {console.log(dadosSucesso.objUserSave),this.verificaSignup(this.verificador)
                sessionStorage.setItem('id',dadosSucesso.objUserSave._id),
                sessionStorage.setItem('username',dadosSucesso.objUserSave.firstName+dadosSucesso.objUserSave.lastName)},
            dadosErro => {console.log(dadosErro),this.verificador=false,this.verificaSignup(this.verificador)}
        );
    }

    verificaSignup(verificador: boolean){
        if(verificador){
            this.myForm.reset();        
            this.router.navigate(['/mensagens']);
            
        }
        else
            alert('Este email já foi cadastrado')
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