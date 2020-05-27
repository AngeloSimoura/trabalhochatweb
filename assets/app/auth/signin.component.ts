import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "./user.services";
import { User } from './user.model';
import {Router} from "@angular/router"


@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    providers: [UserService]
})

export class SigninComponent{
    constructor(private userService: UserService,private router: Router){} 

    myForm : FormGroup;
    verificador: boolean = true;
    hide: true;

    onSubmit(){        
       // console.log(this.myForm);     
        this.userService.getUser(this.myForm.value.emailTS, this.myForm.value.passwordTS)
            .subscribe(
                (dadosSucesso: User) => {
                    //console.log(dadosSucesso);
                    sessionStorage.setItem('id',dadosSucesso.userID);
                    sessionStorage.setItem('username',dadosSucesso.firstName+dadosSucesso.lastName);
                    sessionStorage.setItem('color',dadosSucesso.cor);
                    sessionStorage.setItem('font',dadosSucesso.font);
                    this.verificador=true;
                    this.verificaLogin(this.verificador);
                },
                dadosErro =>{ alert(dadosErro.myErroTitle),
                   // console.log(dadosErro),
                    this.verificador=false,
                    //console.log(this.verificador),
                    this.verificaLogin(this.verificador)}
            );
    }

    verificaLogin(verificador: boolean){
        if(verificador){
            //console.log('Entrei no IF');
            this.myForm.reset();        
            this.router.navigate(['/mensagens']);
        }
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