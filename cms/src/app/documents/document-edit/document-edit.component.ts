import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class  DocumentEditComponent implements OnInit {
  originalDocument!: Document;
  document!: Document;
  editMode!: Boolean;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {
}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        // value of id parameter in params list
         const id = params['id']

         if (id == undefined || id == null) {
            this.editMode = false;
            return
         }
            
         this.originalDocument = this.documentService.getDocument(id)
    
         if (this.originalDocument == null || this.originalDocument == undefined) {
          return
         }

         this.editMode = true
         this.document = JSON.parse(JSON.stringify(this.originalDocument));

    }) 
  }

  onCancel(){
    this.router.navigate(['./documents']) 
  }

  onSubmit(form: NgForm) {
    console.log(this.editMode)
    const value = form.value; // get values from form’s fields
    const newDocument = new Document(value.name, value.id, value.description, value.url, []);
  //   Assign the values in the form fields to the
  //  corresponding properties in the newDocument

   if (this.editMode == true) {
    this.documentService.updateDocument(this.originalDocument, newDocument)
   } 
   else {
    this.documentService.addDocument(newDocument)
   }
  
  //  route back to the '/documents' URL
  this.router.navigate(['./documents']) 
  }

}
