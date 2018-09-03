import {Input, Component, OnInit} from '@angular/core';

import {ChatbotsService} from '../../services/chatbots.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit{
  // message: string;
  // messages: string[] = [];
  //
  // constructor(private chatbotsService: ChatbotsService) {
  // }
  //
  // sendMessage() {
  //   this.chatbotsService.sendMessage(this.message);
  //   this.message = '';
  // }
  // ngOnInit() {
  //   this.chatbotsService
  //     .getMessages()
  //     .subscribe((message: string) => {
  //       this.messages.push(message);
  //     });
  // }
  client: string;
  clientList: string[] = [];
  // clientList: string[] = [];

  constructor(private chatbotsService: ChatbotsService) {
  }

  ngOnInit() {
    this.chatbotsService
      .getClients()
      .subscribe((client) => {
        if (client) {
          const parseClient = JSON.parse(client);
          this.clientList = parseClient;
          console.log(parseClient);
          // console.log(this.clientList);
        }


        // this.messages.push(message);
      });
  }

  public allClients(){
    console.log(this.clientList);
  }


}
