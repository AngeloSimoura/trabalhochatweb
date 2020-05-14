import { Message } from "./message.model";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx'
import { Observable } from "rxjs";
import { Http, Response, Headers} from "@angular/http";

@Injectable()
export class MessageService {
    private messageSService: Message[] = [];

    constructor(private http: Http){}
    messageIsEdit = new EventEmitter<Message>();

    
    addMessage(message: Message){
        //this.messageSService.push(message);
        console.log(this.messageSService);        
        const bodyReq = JSON.stringify(message);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/message',bodyReq, {headers: myHeaders})
            //.map((responseRecebida: Response) => responseRecebida.json())
            .map((responseRecebida: Response) => {
                const aux = responseRecebida.json();
                const newObjMessage = new Message(aux.objMessageSave.content,"Angelo",aux.objMessageSave._id,null);
                this.messageSService.push(newObjMessage);
                return(newObjMessage);
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    getMessages(){
        //return this.messageSService;
        return this.http.get('http://localhost:3000/message')
            .map((responseRecebida: Response)=>{
                const responseEmJSON = responseRecebida.json();
                const messageSResponseRecebida = responseEmJSON.objSMessageSRecuperadoS;
                let transformedCastMessagesModelFrontEnd: Message[] = [];
                for(let msg of messageSResponseRecebida){
                    transformedCastMessagesModelFrontEnd.push(
                        new Message(msg.content,'TesteAngelo',msg._id,null));
                }
                this.messageSService = transformedCastMessagesModelFrontEnd;
                return transformedCastMessagesModelFrontEnd;
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    deleteMessage(message: Message){
        this.messageSService.splice(this.messageSService.indexOf(message), 1);
        return this.http.delete('http://localhost:3000/message/'+message.messageID)
            .map((responseRecebida: Response) => responseRecebida.json())
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    editMessage(message: Message){
        this.messageIsEdit.emit(message);
    }

    updateMessage(message:Message){
        const bodyReq = JSON.stringify(message);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/message/'+message.messageID,bodyReq,{ headers: myHeaders})
            .map((responseRecebida: Response) => responseRecebida.json())
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }
}

