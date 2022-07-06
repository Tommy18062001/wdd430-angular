import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;

  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();
  
  contactListChangedEvent = new Subject<Contact[]>()
  
  constructor(private httpClient: HttpClient) {
    this.fetchContacts().subscribe(
        (contacts) => {
          this.contacts = contacts;
          // console.log(contacts)
          this.sortAndSend();
        },
        (error: any) => {
          console.error(error);
        }
      );
    this.maxContactId = this.getMaxId();
  }

  fetchContacts() {
    return this.httpClient
      .get<{ message: string, contacts: Contact[]}>(
        `http://localhost:3000/contacts`
      
      ).pipe(
        map((responseData) => {
          return responseData.contacts
        })
      )
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach(contact => {
      let currentId = +contact.id
      if (currentId > maxId) {
        maxId = currentId
      }
    });
    return maxId
  }

  getContacts(): Contact[] {
    return this.contacts.slice()
  }

  getContact(id: number){
    return this.contacts[id]
  }

  getContactBySender(id: any) {
    for (const contact of this.contacts) {
      if (contact.id == id) {
        return contact
      }
    }
    return null
  }

  /********* New function added ************/
  sortAndSend(){
    this.contacts.sort();
    this.contactListChangedEvent.next([...this.contacts])
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.httpClient.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        () => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  updateContact(oldContact:Contact, newContact:Contact){
    if(!oldContact || !newContact){
      return
    }
    const pos = this.contacts.indexOf(oldContact);
    if(pos<0){
      return;
    }
    newContact.id = oldContact.id;
    newContact._id = oldContact._id;

    console.log("i am here now")
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.put('http://localhost:3000/contacts/' + oldContact.id,
      newContact, { headers: headers })
      .subscribe(
        () => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

  addContact(contact:Contact){
    if(!contact){
      return
    }
    contact.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
     contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );
  }

}
