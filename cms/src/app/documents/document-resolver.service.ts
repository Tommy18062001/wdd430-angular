import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { response } from "express";
import { Document } from "./document.model";
import { DocumentService } from "./document.service";

@Injectable({
    providedIn: 'root'
})
export class DocumentResolverService implements Resolve<Document[]> {
    constructor(private documentService: DocumentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.documentService.fetchDocuments()
    }

}

// .subscribe(
//     (documentData) => {
//       this.documentService.documents = documentData.documents;
// )