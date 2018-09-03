import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChatbotsService} from '../../../services/chatbots.service';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import * as io from 'socket.io-client';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/throttleTime';
import 'rxjs-compat/add/operator/distinctUntilChanged';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})


export class MessagesComponent implements OnInit, OnDestroy {
  // message: string;
  messages: string[] = [];
  connection: any;
  socketId: string = this.chatbotsService.socket.id;


  constructor(private chatbotsService: ChatbotsService) {
  }

  // sendMessage() {
  //   this.connection = this.chatbotsService.sendMessage(this.message);
  //   this.message = '';
  // }

  ngOnInit() {
    this.chatbotsService
      .getMessages()
      .subscribe((message) => {
        if (message) {
          this.messages.push(message);
          console.log(this.messages);

          console.log(this.chatbotsService.socket);
          this.messages.forEach(item => {
            if (this.chatbotsService.socket.id === item.userId) {
              // @HostBinding('class.own-message') true
              // [class.red]="redClassBool"
              // @HostBinding('class.own-message') isActive: true;
            }
          });

        }


        // this.messages.push(message);
      });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
