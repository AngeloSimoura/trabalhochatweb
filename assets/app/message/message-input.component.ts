import { Component, OnInit } from "@angular/core"
import { MessageService } from "./message.services";
import { Message } from './message.model'
import { NgForm } from "@angular/forms";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component ({
    selector: 'app-message-input',
    templateUrl :'./message-input.component.html',
    //providers: [MessageService]
})

export class MessageInputComponent implements OnInit{
    constructor(private messageService: MessageService){}
    messageLoad: Message;

    onSave(textoConsole: string){
        const messageAux = new Message(textoConsole,sessionStorage.getItem('username'),null,sessionStorage.getItem('id'));
        console.log(messageAux.userID);
        this.messageService.addMessage(messageAux);
        console.log(textoConsole);
    }

    onSubmit(form: NgForm){
        if(sessionStorage.getItem('id')==null)
            alert("É necessário estar logado para enviar uma mensagem!");
        else{
            if(this.messageLoad){
                this.messageLoad.content = form.value.myContentngForm;
                this.messageService.updateMessage(this.messageLoad)
                    .subscribe(
                        dadosSucesso => console.log(dadosSucesso),
                        dadosErro => console.log(dadosErro)
                    );
                this.messageLoad=null;
            }
            else{

                const messageAux = new Message(form.value.myContentngForm,sessionStorage.getItem('username'),null,sessionStorage.getItem('id'));
                this.messageService.addMessage(messageAux)
                    .subscribe(
                        dadosSucesso => console.log(dadosSucesso),
                        dadosErro => console.log(dadosErro)
                    );
                console.log(form);
                form.resetForm();
            }
        }

    }

    ngOnInit(){
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.messageLoad =message
        );
    }

    onClear(form: NgForm){
        this.messageLoad=null;
        form.resetForm();
    }
}