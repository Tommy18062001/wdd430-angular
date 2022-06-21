import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
  
  constructor(private http: HttpClient) {
    this.fetchContacts().subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort();
          this.contactListChangedEvent.next([...this.contacts]);
        },
        (error: any) => {
          console.error(error);
        }
      );
    this.maxContactId = this.getMaxId();
  }

  fetchContacts() {
    return this.http
    .get<Contact[]>(
      `https://tommycmsproject-default-rtdb.firebaseio.com/contacts.json`
    )
  }
  // store the contact
  storeContacts() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.http
      .put(
        'https://tommycmsproject-default-rtdb.firebaseio.com/contacts.json',
        this.contacts,
        { headers }
      )
      .subscribe(() => {
        this.contactListChangedEvent.next([...this.contacts]);
      });
  }

  getMaxId(): number {
    let maxId = 0;
    // for each document in the documents list
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

  /********* New function added ************/
  addContact(newContact: Contact) {
    if (newContact == undefined || newContact == null) {
      return 
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    // const contactsListClone = this.contacts.slice()
    // this.contactListChangedEvent.next(contactsListClone)
    this.storeContacts()
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact == undefined || originalContact == null || newContact == undefined || newContact == null ) {
      return
    };
    const pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return
    };
  
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    // const contactsListClone = this.contacts.slice()
    // this.contactListChangedEvent.next(contactsListClone)
    this.storeContacts()
   }
   
   deleteContact(contact: Contact) {
    if (document == undefined || document == null) {
      return
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {return};

    this.contacts.splice(pos, 1)
    // const contactsListClone = this.contacts.slice()
    // this.contactListChangedEvent.next(contactsListClone)
    this.storeContacts()
   }

}
