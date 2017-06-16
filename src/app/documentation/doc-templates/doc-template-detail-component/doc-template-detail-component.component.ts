import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DocReport } from '../doc-report';
import { DocTemplateService } from '../doc-template.service';

import { APP_CONFIG } from '../../../app.config';
import { IAppConfig } from "../../../appconfig";

@Component({
  selector: 'app-doc-template-detail-component',
  templateUrl: './doc-template-detail-component.component.html',
  styleUrls: ['./doc-template-detail-component.component.css']
})
export class DocTemplateDetailComponentComponent implements OnInit {

    loading = false;
    tmpName: string;
    status: string = "fail";
    urlFile: string = "URL";
    z2c_wiki_ws: string = "";

    docRpt: DocReport;

    constructor(
        private route: ActivatedRoute,
        private reportsService: DocTemplateService,
        @Inject(APP_CONFIG) private config: IAppConfig,
    ) { }

    ngOnInit(): void {
        let templateName = this.route.snapshot.params['id'];
        this.tmpName = templateName;

        this.generateReport(this.tmpName);
        this.z2c_wiki_ws = this.config.adminwiki_url;
    }

    generateReport(templateName) {
        this.loading = true;
        this.reportsService
            .getDocumentReport(templateName)
            .subscribe(docRpt => {
                console.log("Document file is: " + docRpt.docFile);
                console.log("HTML file is: " + docRpt.htmlFile);
                this.loading = false;
                this.docRpt = docRpt;
            });
    }
}