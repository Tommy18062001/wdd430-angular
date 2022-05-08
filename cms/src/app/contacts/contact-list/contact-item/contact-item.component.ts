import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../contact.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact!: Contact;
  //emit an event for the parent component to be informed
  @Output() contactSelected = new EventEmitter<Contact>()

  constructor() { }

  ngOnInit(): void {
  }

  onContactSelected() {
    this.contactSelected.emit()
  }
}
