import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat/chat.service';
import {TokenStorageService} from '../../../services/token-storage.service';

type MyArrayType = Array<{ id: number, name: string }>;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService,
              private token: TokenStorageService) {
  }

  arr: MyArrayType = [
    {id: 1, name: 'Prieten'},
    {id: 2, name: 'User 2'},
    {id: 3, name: 'User 3'},
    {id: 4, name: 'User 4'},
  ];

  ngOnInit() {
  }

  getAllActiveChats() {
    this.chatService.getAllActiveChats(this.token.getUser().id).subscribe(response => {
      console.log(response);
    });
  }

}
