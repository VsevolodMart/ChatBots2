import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ChatbotsService} from '../../services/chatbots.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {
  client: string;
  clientList: string[] = [];
  clientId: string;

  constructor(private chatbotsService: ChatbotsService) {
  }

  ngOnInit() {
    this.chatbotsService
      .getClients()
      .subscribe((client) => {
        if (client) {
          this.clientList = JSON.parse(client);
        }
      });
  }

  public onClick(event) {
    let target = event.currentTarget;
    this.clientId = target.getAttribute('id');

    console.log(this.clientId);
    this.chatbotsService.botId = this.clientId
  }

}

