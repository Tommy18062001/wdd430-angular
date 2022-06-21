import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();

  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.fetchDocuments().subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort();
        this.documentListChangedEvent.next([...this.documents]);
      },
      (error: any) => {
        console.error(error);
      }
    );
    this.maxDocumentId = this.getMaxId();
  }

  fetchDocuments() {
    return this.http
      .get<Document[]>(
        `https://tommycmsproject-default-rtdb.firebaseio.com/documents.json`
      )
  }

  // store the document
  storeDocuments() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.http
      .put(
        'https://tommycmsproject-default-rtdb.firebaseio.com/documents.json',
        this.documents,
        { headers }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next([...this.documents]);
      });
  }

  getDocuments():Document[]{
    return [...this.documents]
  }

  getDocument(id: number) {
    return this.documents[id];
  }

  addDocument(newDocument: Document) {
    if (newDocument == undefined || newDocument == null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments()
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (
      originalDocument == undefined ||
      originalDocument == null ||
      newDocument == undefined ||
      newDocument == null
    ) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments()
  }

  deleteDocument(document: Document) {
    if (document == undefined || document == null) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments()
  }

  /********* New function added ************/
  getMaxId(): number {
    let maxId = 0;
    // for each document in the documents list
    this.documents.forEach((document) => {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
}
