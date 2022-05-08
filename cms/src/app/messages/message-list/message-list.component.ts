import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Call', 'What is your name', 'Sylver'),
    new Message('2', 'Test 2', 'Good job!', 'Billy'),
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message)
  }


}
