import { Component } from "@angular/core"
import { MessageService } from "./message.services";
import { Message } from './message.model'
import { NgForm } from "@angular/forms";

@Component ({
    selector: 'app-message-input',
    templateUrl :'./message-input.component.html',
    //providers: [MessageService]
})

export class MessageInputComponent{
    constructor(private messageService: MessageService){}

    onSave(textoConsole: string){
        const messageAux = new Message(textoConsole,'Angelo');
        this.messageService.addMessage(messageAux);
        console.log(textoConsole);
    }

    onSubmit(form: NgForm){
        const messageAux = new Message(form.value.myContentngForm,'AnGelo');
        this.messageService.addMessage(messageAux)
            .subscribe(
                dadosSucesso => console.log(dadosSucesso),
                dadosErro => console.log(dadosErro)
            );
        console.log(form);
        form.resetForm();
    }
}