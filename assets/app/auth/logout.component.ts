import { Component } from "@angular/core";


@Component({
    selector: 'app-logout',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onMudaMostrarElemento()">Logout</button>
            {{mostrarElemento}}
            {{frase}}
            <p *ngIf="mostrarElemento">
                <button class="btn btn-danger">Logout</button>
                {{frase}}
            </p>
        </div>
    `
})

export class LogoutComponent{
    mostrarElemento: boolean = true;
    frase: string;

    onMudaMostrarElemento(){
        localStorage.setItem('a','teste');
        var verifica = localStorage.getItem('a');
        var verificaB = localStorage.getItem('b');
        console.log(verifica);
        console.log(verificaB);
        if(verifica==null)
            this.frase="Você não está logado"
        else{
            this.mostrarElemento = !this.mostrarElemento;
            this.frase="Você está logado"
        }
    }
    onLogout(){
        
    }
}