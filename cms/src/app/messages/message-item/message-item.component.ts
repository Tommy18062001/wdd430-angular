import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender!: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    const contact: Contact | null = this.contactService.getContactBySender(this.message.sender);
    if (contact != null) {
      this.messageSender = contact.name; 
    } 
    
  }
}
