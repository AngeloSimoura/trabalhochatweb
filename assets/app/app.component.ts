import { Component } from '@angular/core';
import { Message } from './message/message.model';
import { MessageService } from './message/message.services';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent {
    nomeNgSwitch: string ="";
    valorNgSwitch: number;

    mostrarElemento: boolean = true;
    onMudaMostrarElemento(){
        this.mostrarElemento = !this.mostrarElemento;
    }

    messageS : Message[] = [ new Message("Texto da mensagem","AngeloSimoura"),
                             new Message("Texto 2 da mensagem","SimouraAngelo"),
                             new Message("Texto 3 da mensagem","SilvaAngelo")
                           ];

    messageBinding: Message = new Message("Texto da mensagem","AngeloSimoura");
    //messageBindingAlias: Message = new Message("Texto da mensagem Alias","Angelo Simoura Alias");

    idade: number=10;
    nome = 'Hoje';

    message = {
        conteudo:"Texto",
        usuario: "Euadas"
    }
    conteudo1VarClassComponent = 'Conteudo da variavel';
    conteudo2VarClassComponent = 123;
    conteudo3VarClassComponent = 123.45;
}