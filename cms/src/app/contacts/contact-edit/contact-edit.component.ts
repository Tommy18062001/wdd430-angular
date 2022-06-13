import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact!: Contact;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;
   

  invalid: boolean = false;

   constructor(
        private contactService: ContactService,
        private router: Router,
        private route: ActivatedRoute) {
        }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
         const id = params['id']

         if (id == undefined || id == null) {
            this.editMode = false;
            return
         }
            
         this.originalContact = this.contactService.getContact(id)
    
         if (this.originalContact == null || this.originalContact == undefined) {
          return
         }

         this.editMode = true
         this.contact = JSON.parse(JSON.stringify(this.originalContact));

         if (this.contact.group) {
            this.groupContacts = this.contact.group;
         }

    }) 
  }

  onCancel() {
    this.router.navigate(['/contacts'])
  }
  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
       return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
       if (newContact.id === this.groupContacts[i].id) {
         return true;
      }
    }
    return false;
 }

 addToGroup($event: any) {
  const selectedContact: Contact = $event.dragData;
  const invalidGroupContact = this.isInvalidContact(selectedContact);
  if (invalidGroupContact){
    this.invalid = true;
      return;
  }
  this.invalid = false;
  this.groupContacts.push(selectedContact);
  console.log(this.groupContacts)
}

onSubmit(form: NgForm) {
  console.log(form.value)
  const value = form.value; // get values from form’s fields
  const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, this.groupContacts);
//   Assign the values in the form fields to the
//  corresponding properties in the newDocument

 if (this.editMode == true) {
  this.contactService.updateContact(this.originalContact, newContact)
 } 
 else {
  this.contactService.addContact(newContact)
 }

 
//  route back to the '/documents' URL
this.router.navigate(['./contacts']) 

}


  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

}

