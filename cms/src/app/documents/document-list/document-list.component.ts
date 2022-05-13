import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [
    new Document("WDD 130: Introduction to Web", "2", "Study the basic components of web and start create your first web page.", "https://catalog.byu.edu/business/information-systems/introduction-web-development", []),
    new Document("CSE 340: Web Backend Development", "3", "Use PHP to interact with the web server", "#", []),
    new Document("ENG 150: Writing and reasoning Foundation", "4", "Improve your writing skills", "#", []),
    new Document("WDD 430: Web Full Stack Development", "5", "This course will teach students how to design and build interactive web based applications using HTML CSS, JavaScript, and a web development stack (3 credits).", "#", []),
    new Document("WDD 330: Web Front end Development II", "1", "Apply HTML, CSS, JS to build interactive and dynamic front end style.", "#", []),
  ]

  @Output() selectedDocumentEvent = new EventEmitter<Document>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document)
  }

}
