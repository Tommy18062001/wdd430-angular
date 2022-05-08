import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: string = 'Tommy';
  @ViewChild('subject') subjectInputRef!: ElementRef;
  @ViewChild('msgText') msgInputRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>()

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const sbj = this.subjectInputRef.nativeElement.value;
    const msg = this.msgInputRef.nativeElement.value;
    const newMessage = new Message('1', sbj, msg, this.currentSender);
    this.addMessageEvent.emit(newMessage)

    // clear message after submitting 
    this.onClear()
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgInputRef.nativeElement.value = "";
  }
}
