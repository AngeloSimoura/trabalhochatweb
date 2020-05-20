import { User } from './user.model';
import { Http, Response, Headers} from "@angular/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');

@Injectable()
export class UserService {
    private userService: User;
    constructor(private http: Http){}

     addUser(user: User){
        console.log(user);
              
        const userS = JSON.stringify(user);
        console.log(userS);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user',userS, {headers: myHeaders})
            .map((responseRecebida: Response) => responseRecebida.json())
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
           
    }
           
    

    getUser(emailT: string, passwordT: string){
        const userData = {emailT,passwordT};
        console.log(userData);
        const userDataX = JSON.stringify(userData);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/login',userDataX,{headers: myHeaders})
        .map((res: Response) => { 
            const resEmJson = res.json();
            console.log(resEmJson);
            const docs = resEmJson.usuarioRecuperado;
            var userNew = new User(docs.email,docs.password,docs.firstName,docs.lastName,docs._id);
            return userNew;                    
        })
        .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

}