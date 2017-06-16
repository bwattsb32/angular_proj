import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Inventory } from './inventory';
import { CmoComponent } from './cmo-component';
import { SoftwarePkg } from './software-package';
import { Environment } from './environment';
import { Deployment } from './deployment';
import { Network } from './network';
import { TemplateNode } from './template-node';
import { VirtualHost } from './virtual-host';
import { VirtualNode } from './virtual-node';

import { TemplateNodeObj } from './template-node-obj';

import { APP_CONFIG } from '../app.config';
import { IAppConfig } from "../appconfig";

@Injectable()
export class InventoryService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    invType:String;


    constructor(
        @Inject(APP_CONFIG) private config: IAppConfig,
        private http: Http
    ) { }

    
    // returns list of Environments for the following actions/pages
    // -------------------
    getEnvironments(): Observable<Environment[]> {
        return this.http.get(this.config.service_url + "environments/a19a5690-7a7d-4da8-950d-6185de9a6439")
            .map(res => res.json()["data"])
            .catch(this.handleError);
    }

    // returns list of Networks for the following actions/pages
    // -------------------
    getNetworks(): Observable<Network[]> {
        return this.http.get(this.config.service_url + "networks/cb465f9f-7fa2-45e7-87b9-de8538c2aa94")
            .map(res => res.json()["data"])
            .catch(this.handleError);
    }

    // returns list of Template Nodes types for the following actions/pages
    // -------------------
    getTemplateNodes(): Observable<TemplateNode[]> {
        let options = new RequestOptions({ headers: this.headers });
        let body = { "orgId": "http://z2c.dts-inc.com/id/a19a5690-7a7d-4da8-950d-6185de9a6439" };
        return this.http.post(this.config.service_url + "templates", body, options)
            .map(res => res.json()["data"])
            .catch(this.handleError);
    }

    getInventory(invType: String): Observable<any> {
        return this.http.get(this.config.service_url + "inventory/getInventory" + "?invType=" + invType)
            .map(res => res.json()["data"])
            .catch(this.handleError);
    }

    getComponentsByOS(): Observable<any> {
        return this.http.get(this.config.service_url + "components/getOS")
            .map(res => res.json()["data"])
            .catch(this.handleError);
    }

    getComponentsBySoftwarePkg(): Observable<any> {
        return this.http.get(this.config.service_url + "components/getSoftPkgs")
            .map(res => res.json()["data"])
            .catch(this.handleError);
    }

    getVirtualHosts(): Observable<VirtualHost[]> {
        return this.http.get(this.config.service_url + "virtualhosts")
            .map(res => res.json()["data"])
            .catch(this.handleError);
    }

    getVirtualNodes(): Observable<any> {
        let body = { "orgId": "http://z2c.dts-inc.com/id/a19a5690-7a7d-4da8-950d-6185de9a6439" };
        return this.http.post(this.config.service_url + "virtualnodes", body, { headers: this.headers })
            .map(res => res.json()["data"])
            .catch(this.handleError);
    }

    deploy(request: Deployment): Observable<any> {
        let body = JSON.stringify(request);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.config.service_url + "deployRx", body, { headers: this.headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteVM(request: VirtualNode): Observable<any> {
        let body = JSON.stringify(request);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.config.service_url + "virtualNodes/deleteRx", body, { headers: this.headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteVMDB(request: VirtualNode): Observable<any> {
        let body = JSON.stringify(request);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.config.service_url + "virtualNodes/deleteDBRx", body, { headers: this.headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    createTemplate(request: TemplateNodeObj): Observable<any> {
        let body = JSON.stringify(request);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.config.service_url + "templates/create", body, { headers: this.headers })
            .map(res => res.json())
            .catch(this.handleError);
    }



    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }



}
