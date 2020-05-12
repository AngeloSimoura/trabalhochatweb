import { User } from './user.model';
import { Http, Response, Headers} from "@angular/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

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
}