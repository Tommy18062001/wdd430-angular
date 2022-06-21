import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Contact } from "./contact.model";
import { ContactService } from "./contact.service";

@Injectable({
    providedIn: 'root'
})
export class ContactResolverService implements Resolve<Contact[]> {
    constructor(private contactService: ContactService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.contactService.fetchContacts()
    }

}