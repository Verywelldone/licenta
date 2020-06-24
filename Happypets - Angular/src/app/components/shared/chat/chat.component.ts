import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat/chat.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {CometChat} from '@cometchat-pro/chat';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  ngOnInit(): void {
    CometChat.getLoggedinUser().then(user => {
      console.log('we are here', user);
      if (!user) {
        location.href = '/';
      }
    }, error => {
      console.log(error);
      location.href = '/';
    });
  }

  constructor(private chatService: ChatService,
              private token: TokenStorageService) {
  }


}
