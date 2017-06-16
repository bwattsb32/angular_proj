import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Router } from '@angular/router'

import { InventoryService } from './inventory.service';
import { Inventory } from './inventory';
import { CmoComponent } from './cmo-component';
import { SoftwarePkg } from './software-package';
import { TemplateNode } from './template-node';
import { VirtualHost } from './virtual-host';
import { VirtualNode } from './virtual-node';

import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { APP_CONFIG } from '../app.config';
import { IAppConfig } from "../appconfig";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  loading = false;
  waitMessage = 'Loading....Please wait.';
  cmoComponents: CmoComponent[];
  softwarePkgs: SoftwarePkg[];
  virtualHosts: VirtualHost[];
  virtualNodes: VirtualNode[];
  templateNodes: TemplateNode[];
  inventory: Inventory[];
  service_url: string = "";
  p = 1;
  invType: string = "";

  c1 = 47;
  c2 = 3;
  c3 = 8;
  c4 = 14;
  c5 = 20;
  c6 = 3;

    // PolarArea
  public polarAreaChartLabels:string[] = ['Virtual Nodes', 'Physical Nodes', 'Document Templates', 'VM Templates', 'Software Packages', 'Operating Systems'];
  public polarAreaChartData:number[] = [this.c1, this.c2, this.c3, this.c4, this.c5, this.c6];
  public polarAreaLegend:boolean = true;

  public polarAreaChartType:string = 'polarArea';



  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    @Inject(APP_CONFIG) private config: IAppConfig,

  ) {
      this.service_url = config.service_url;
   }

  getInventory(): void {
    this.loading = true;
    this.invType = "all";
    this.inventoryService
      .getInventory(this.invType)
      .subscribe(inventory => {
        console.log("Inventory: " + JSON.stringify(inventory, null, 2));
        this.inventory = inventory;
        this.loading = false
      });
  }

  getComponentsByOs(): void {
    this.loading = true;
    this.inventoryService
      .getComponentsByOS()
      .subscribe(cmoComponents => {
        console.log("CmoComponents: " + JSON.stringify(cmoComponents, null, 2));
        this.cmoComponents = cmoComponents;
        this.loading = false
      });
  }

  getComponentsBySoftwarePkg(): void {
    this.loading = true;
    this.inventoryService
      .getComponentsBySoftwarePkg()
      .subscribe(softwarePkgs => {
        console.log("SoftwarePkgs: " + JSON.stringify(softwarePkgs, null, 2));
        this.softwarePkgs = softwarePkgs;
        this.loading = false
      });
  }

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

  getVirtualHosts(): void {
    this.loading = true;
    this.inventoryService
      .getVirtualHosts()
      .subscribe(virtualHosts => {
        console.log("PhysicalNodes: " + JSON.stringify(virtualHosts, null, 2));
        this.virtualHosts = virtualHosts;
        this.loading = false
      });

  }

  getVirtualNodes(): void {
    this.loading = true;
    this.inventoryService
      .getVirtualNodes()
      .subscribe(virtualNodes => {
        console.log("VirtualNodes: " + JSON.stringify(virtualNodes, null, 2));
        this.virtualNodes = virtualNodes;
        this.loading = false;
      });

  }


  deleteVirtualNode(virtualNode: VirtualNode) {
    this.loading = true;
    this.waitMessage = 'Deleting and unregistering node...Please wait...';
    this.inventoryService
      .deleteVM(virtualNode)
      .subscribe((data: any[]) => {
        console.log("VirtualNode: " + JSON.stringify(data, null, 2));
        this.virtualNodes = data;
        this.loading = false;
      });
  }

  deleteVirtualNodeDB(virtualNode: VirtualNode) {
    this.loading = true;
    this.waitMessage = 'Deleting and unregistering node...Please wait...';
    this.inventoryService
      .deleteVMDB(virtualNode)
      .subscribe((data: any[]) => {
        console.log("VirtualNode: " + JSON.stringify(data, null, 2));
        this.virtualNodes = data;
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.getInventory();
    this.c1 = 8;
  }


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}