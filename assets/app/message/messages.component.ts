import { Component } from "@angular/core";

@Component({
    selector: 'app-messages',
    template: `
    <div class="row">
        <strong class="col-md-8 col-md-offset-2"> ==Após Restruturação</strong>
        <app-message-input></app-message-input>
    </div>
    <br>
    <div class="row">
        <app-message-list></app-message-list>
        <strong class="col-md-8 col-md-offset-2"> ==Após Restruturação</strong>
    </div>
    `
})

export class MessagesComponent {

}