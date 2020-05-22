import { Component } from "@angular/core";
import {Router} from "@angular/router"


@Component({
    selector: 'app-logout',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </div>
    `
})

export class LogoutComponent{
    constructor(private router: Router) {}

    onLogout(){
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');
        this.router.navigate(['/mensagens']);
    }
}