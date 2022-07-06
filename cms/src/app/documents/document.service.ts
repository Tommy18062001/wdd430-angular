import {EventEmitter, Injectable} from '@angular/core';
import {Document} from "./document.model";
import {Subject} from "rxjs";
import { map, tap } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents:Document[] = []
  documentSelectedEvent =  new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  maxDocumentId!:number;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.fetchDocuments().subscribe(
      (documentList) => {
        this.documents = documentList;
        console.log(this.documents)
        // this.maxDocumentId = this.getMaxId();
        this.sortAndSend()
        // this.documentListChangedEvent.next([...this.documents])
      },
      (error: any) => {
        console.error(error);
      }
    );
    
  }


  getDocuments():Document[]{
    return [...this.documents]
  }

  getDocument(id: number) {
    return this.documents[id];
  }

// `https://tommycmsproject-default-rtdb.firebaseio.com/documents.json`
  fetchDocuments() {
    return this.httpClient
      .get<{ message: string, documents: Document[]}>(
        `http://localhost:3000/documents`
      
      ).pipe(
        map((responseData) => {
          return responseData.documents
        })
      )
  }

  selectDocument(document: Document){
    this.documentSelectedEvent.emit(document);
  }

  sortAndSend(){
    this.documents.sort();
    this.documentListChangedEvent.next([...this.documents])
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.httpClient.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        () => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  updateDocument(oldDocument:Document, newDocument:Document){
    if(!oldDocument || !newDocument){
      return
    }
    const pos = this.documents.indexOf(oldDocument);
    if(pos<0){
      return;
    }
    newDocument.id = oldDocument.id;
    // newDocument._id = oldDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.put('http://localhost:3000/documents/' + oldDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        () => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  addDocument(document:Document){
    if(!document){
      return
    }
    document.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  getMaxId():number {
    let maxid= 0;
    for(let documentItem of this.documents){
      const id =+documentItem.id;
      if(id > maxid){
        maxid =id;
      }
    }
    return maxid;
  }
}
