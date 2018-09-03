import {Component, OnInit} from '@angular/core';
import {ChatbotsService} from '../services/chatbots.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private chatbotsService: ChatbotsService) {
  }
}

