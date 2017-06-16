import { Component } from '@angular/core';
import { Deployment } from './deployment';
import { TemplateNode } from './template-node';
// 20161114 RAB No longer need to specify host
//import { VirtualHost } from './virtual-host';
import { Environment } from './environment';
import { Network } from './network';
import { InventoryService } from './inventory.service';

@Component({
  templateUrl: './deployment-form.component.html',
  providers: [InventoryService],
})
export class DeploymentForm {
  submitted = false;
  model = new Deployment();

  // Populated from the database
  templateNodes: Array<TemplateNode>;
  // 20161114 RAB No longer need to specify host
  //virtualHosts: Array<VirtualHost>;
  environments: Array<Environment>;
  networks: Array<Network>;
  serverResp: string;

  loading = false;
  waitMessage = '';

  constructor(private inventoryService: InventoryService) { }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.waitMessage = 'Creating VM...Please wait.';
    console.log("Submitted:" + JSON.stringify(this.model));
    this.inventoryService.deploy(this.model)
      .subscribe(resp => {
        this.serverResp = JSON.stringify(resp, null, 2);
        this.loading = false;
        this.waitMessage = '';
      })
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }

  // Retrieve template data from service
  getTemplateNodes(): void {
    this.loading = true;
    this.inventoryService
      .getTemplateNodes()
      .subscribe(templateNodes => {
        console.log("TemplateNodes: " + JSON.stringify(templateNodes, null, 2));
        this.templateNodes = templateNodes;
        this.loading = false
      });
  }

  getEnvironments() {
      this.inventoryService.getEnvironments()
        .subscribe( (data: Environment[]) => {
          console.log("Environments: "+JSON.stringify(data,null,2));
          this.environments = data;
          //this.model.environment = data[0];
        });
  }

  // 20161114 RAB No longer need to specify host
  // getVirtualHosts(): void {
  //   this.loading = true;
  //   this.inventoryService
  //     .getVirtualHosts()
  //     .then(virtualHosts => {
  //       console.log("VirtualNodes: " + JSON.stringify(virtualHosts, null, 2));
  //       this.virtualHosts = virtualHosts;
  //       this.loading = false
  //     });
  //
  // }

  getNetworks() {
    this.inventoryService.getNetworks()
      .subscribe((data: Network[]) => {
        console.log("Networks: " + JSON.stringify(data, null, 2));
        this.networks = data;
        //this.model.network = data[0];
      });
  }

  ngOnInit() {
    this.getTemplateNodes();
    this.getEnvironments();
    // 20161114 RAB No longer need to specify host
    //this.getVirtualHosts();
    this.getNetworks();
  }

  goBack(): void {
    window.history.back();
  }

}
