import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  // messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;
  messageListChangedEvent = new Subject<Message[]>()


  constructor(private http: HttpClient) { 
    http
      .get<Message[]>(
        `https://tommycmsproject-default-rtdb.firebaseio.com/messages.json`
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort();
          this.messageListChangedEvent.next([...this.messages]);
        },
        (error: any) => {
          console.error(error);
        }
      );
    this.maxMessageId = this.getMaxId()
  }


  storeMessages() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.http
      .put(
        'https://tommycmsproject-default-rtdb.firebaseio.com/messages.json',
        this.messages,
        { headers }
      )
      .subscribe(() => {
        this.messageListChangedEvent.next([...this.messages]);
      });
  }

  getMaxId(): number {
    let maxId = 0;
    // for each message in the messags list
    this.messages.forEach(message => {
      let currentId = +message.id
      if (currentId > maxId) {
        maxId = currentId
      }
    });
    return maxId
  }

  getMessages(): Message[] {
    return this.messages.slice()
  }

  getMessage(id: string) {
    for (let message of this.messages) {
      if (message.id == id) {
        return message
      }
    }
    return null
  }

  addMessage(message: Message) {
    this.messages.push(message);
    // this.messageListChangedEvent.next(this.messages.slice())
    this.storeMessages()
  }
}
