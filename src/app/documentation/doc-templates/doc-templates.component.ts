import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DocTemplate } from './doc-template';
import { DocTemplateService } from './doc-template.service';

@Component({
  selector: 'app-doc-templates',
  templateUrl: './doc-templates.component.html',
  styleUrls: ['./doc-templates.component.css']
})
export class DocTemplatesComponent implements OnInit {
    loading = false;
    waitMessage = 'Loading....Please wait.';
    docTemplates: DocTemplate[];
    p = 1;

    constructor(
        private docTemplateService: DocTemplateService,
        private router: Router
    ) { }

    getDocumentTemplates(): void {
        this.loading = true;
        this.docTemplateService
            .getDocumentTemplates()
            .subscribe(docTemplates => {
                console.log("Document Templates: " + JSON.stringify(docTemplates, null, 2));
                this.docTemplates = docTemplates;
                this.loading = false;
            });

    }

    ngOnInit(): void {
        this.getDocumentTemplates();
    }
}