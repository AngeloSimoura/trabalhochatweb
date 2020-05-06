import { Component, Input, Output, EventEmitter } from "@angular/core";
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
export class MessageComponent{
    constructor(private messageServiceObj: MessageService){}
    onDeleteService(){
        this.messageServiceObj.deleteMessage(this.messageVarClasse)
        .subscribe(
                dadosSucesso => console.log(dadosSucesso),
                dadosErro => console.log(dadosErro)
            );
    }

    color = 'yellow';
    tam=12;
    onMudaStyle(){
        this.color = 'red';
        this.tam=16;
    }
    @Input() messageVarClasse : Message = new Message("", "");
    //@Input('inputMessage') messageVarClasseAlias : Message = new Message("", "");

    onEdit(){
        alert("Tá Funcionando!!!");
        this.editClicked_MessageMetodoClasse.emit("Texto veio da mensagem (child) para o app (pai)");
    }

    @Output() editClicked_MessageMetodoClasse = new EventEmitter<string>();
}