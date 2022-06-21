import {EventEmitter, Injectable} from '@angular/core';
import {Document} from "./document.model";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents:Document[] = []
  documentSelectedEvent =  new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxId:number;
  
  constructor(private httpClient: HttpClient) {
    httpClient.get<Document[]>(`https://tommycmsproject-default-rtdb.firebaseio.com/documents.json`).subscribe(
      (documents:Document[])=>{
        this.documents = documents;
        this.maxId = this.getMaxId();
        this.documents.sort((doc1,doc2)=>{
          return parseInt(doc1.id) - parseInt(doc2.id);
        })
        this.documentListChangedEvent.next([...this.documents]);
      },
    (error:any)=>{
        console.error(error);
    }
    )
    this.maxId = this.getMaxId();
  }

  storeDocuments() {
    const headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    this.httpClient.put('https://tommycmsproject-default-rtdb.firebaseio.com/documents.json',this.documents,{headers}).subscribe(()=>{
      this.documentListChangedEvent.next([...this.documents]);
    })
  }
  getDocuments():Document[]{
    return [...this.documents]
  }

  getDocument(id: number):Document{
    return this.documents[id]
  }

  selectDocument(document: Document){
    this.documentSelectedEvent.emit(document);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments()
    // // this.documentChangedEvent.emit([...this.documents]);
    // this.documentChangedEvent.next([...this.documents]);

  }

  updateDocument(oldDocument:Document,newDocument:Document){
    if(!oldDocument || !newDocument){
      return
    }
    const pos = this.documents.indexOf(oldDocument);
    if(pos<0){
      return;
    }
    newDocument.id = oldDocument.id;
    this.documents[pos] = newDocument;
    // this.documentChangedEvent.next([...this.documents]);
    this.storeDocuments()
  }

  addDocument(document:Document){
    if(!document){
      return
    }
    this.maxId++
    document.id = this.maxId+'';
    this.documents.push(document);
    // this.documentChangedEvent.next([...this.documents]);
    this.storeDocuments()
  }

  getMaxId():number {
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