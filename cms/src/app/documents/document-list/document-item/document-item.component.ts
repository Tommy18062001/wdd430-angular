import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from '../../document.model';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document!: Document;
  @Input() index!: number;
  documentService: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  

}
