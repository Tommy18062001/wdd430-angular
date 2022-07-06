import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  // messageChangedEvent = new EventEmitter<Message[]>();
  // maxMessageId: number;
  messageListChangedEvent = new Subject<Message[]>()


  constructor(private httpClient: HttpClient) { 
    this.fetchMessages()
      .subscribe(
        (messages) => {
          // console.log(messages)
          this.messages = messages;
          this.sortAndSend()
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  fetchMessages() {
    return this.httpClient
    .get<{ message: string, messages: Message[]}>(
      `http://localhost:3000/messages`
    
    ).pipe(
      map((responseData) => {
        return responseData.messages
      })
    )
  }

  sortAndSend(){
    this.messages.sort();
    this.messageListChangedEvent.next([...this.messages])
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

  addMessage(message:Message){
    if(!message){
      return
    }
    message.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<{ message: string, createdMessage: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.createdMessage);
          this.sortAndSend();
        }
      );
  }
}
