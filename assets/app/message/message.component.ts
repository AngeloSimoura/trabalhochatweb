import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.services";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [`
        .author {
            display: inline-bock;
            font-style: italic;
            font-size : 12px;
            width :80%;
        }
        .config {
            display: inline-bock;
            text-align: right;
            font-size : 12px;
            width :19%;
        }
    `]
})
export class MessageComponent implements OnInit{
    constructor(private messageServiceObj: MessageService){}
    mostrarElemento: boolean = true;
    color: String;
    tam: String;

    ngOnInit(){
        if (this.messageVarClasse.userID!=sessionStorage.getItem('id')){
            this.mostrarElemento=false;
            this.color='yellow';
            this.tam = '12';
        }
        else{
            this.color=sessionStorage.getItem('color');
            this.tam = sessionStorage.getItem('font');
        }
    }
    
    onDeleteService(){
        if(this.messageVarClasse.userID!=sessionStorage.getItem('id')){
            alert('Você não pode deletar a mensagem de outro usuário');
        }
        else{
            this.messageServiceObj.deleteMessage(this.messageVarClasse)
            .subscribe(
                    dadosSucesso => console.log(dadosSucesso),
                    dadosErro => console.log(dadosErro)
            );
        }
    }
    @Input() messageVarClasse : Message = new Message("", "");
    //@Input('inputMessage') messageVarClasseAlias : Message = new Message("", "");

    onEditService(){
        if(this.messageVarClasse.userID!=sessionStorage.getItem('id'))
            alert('Você não pode editar a mensagem de outro usuário');
        else 
            this.messageServiceObj.editMessage(this.messageVarClasse);
    }

    @Output() editClicked_MessageMetodoClasse = new EventEmitter<string>();
}