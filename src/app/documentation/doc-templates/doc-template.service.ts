import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DocTemplate } from './doc-template';
import { DocReport } from './doc-report';

import { APP_CONFIG } from '../../app.config';
import { IAppConfig } from "../../appconfig";

@Injectable()
export class DocTemplateService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    methodName: string;


    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http
    ) { }


    getDocumentTemplates(): Observable<DocTemplate[]> {
        // getDocumentTemplates(): Observable<any> {
        return this.http.get(this.config.adminwiki_url + "getDocumentTemplates")
            .map(res => res.json()["data"])
            .catch(this.handleError);
    }
    getDocumentReport(templateName): Observable<DocReport> {
        if (templateName == 'SSP Structure 1.0') {
            this.methodName = 'genSSPDocx';
        };
        // getDocumentTemplates(): Observable<any> {
        if (templateName == 'Boundary Matrix 1.0') {
            this.methodName = 'genBMDocx';
        };
         if (templateName == 'Boundary Matrix 1.0_HW') {
            this.methodName = 'genBMHWDocx';
        };
         if (templateName == 'Boundary Matrix 1.0_SW') {
            this.methodName = 'genBMSWDocx';
        };
        if (templateName == 'Plan of Action and Milestones 1.0') {
            this.methodName = 'genPOAMDocx';
        };
        return this.http.get(this.config.adminwiki_url + this.methodName)
            // .map(res => res.json()["data"])
            .map(res => res.json())
            // .map(res => res.toString)
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
