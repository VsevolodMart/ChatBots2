import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';
// (window as any).global = window

import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';


@Injectable()
export class ChatbotsService {
  private url = 'http://localhost:3000';
  public socket;
  private clientList: any[] = [];
  private username: string;

  public botId: string;

  constructor(private httpClient: HttpClient) {
    this.socket = io(this.url);
  }

  public getClients() {
    return Observable.create((observer) => {
      this.httpClient.get(this.url + '/clientlist').subscribe((res) => {
        this.clientList = JSON.parse(res);
        observer.next(res);
      });
    });
  }


  public sendMessage(message) {
    if (!message) {
      return;
    }
    // let socketId = this.socket;
    // console.log(socketId);
    //
    // console.log(this.socket.listeners(this.socket.id));
    if (this.clientList.length) {
      this.clientList.forEach(item => {
        if (item.id === this.socket.id) {
          this.username = item.userName;
        }
      };
    }
    if (message && this.botId) {
      this.socket.emit('sendMessageBot', this.botId, message, {
        from: this.username,
        content: message,
        timestamp: moment(new Date()).format('HH:mm:ss'),
        userId: this.socket.id,
        to: this.botId
      });
    } else {
      if (this.username) {
        this.socket.emit('new-message', {
          from: this.username,
          content: message,
          timestamp: moment(new Date()).format('HH:mm:ss'),
          userId: this.socket.id,
        });
      }
    }


  }


  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  };
}
