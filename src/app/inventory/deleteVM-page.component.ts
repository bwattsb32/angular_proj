import { Component } from '@angular/core';

import { VirtualNode } from './virtual-node';
import { InventoryService } from './inventory.service';

@Component({
  templateUrl: './deleteVM-page.component.html',
  providers: [InventoryService],
})
export class DeleteVMPage {
  loading = false;
  submitted = false;

  // Populated from the database
  virtualNodes: VirtualNode;
  serverResp: string;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
     
  }


  deleteVM(): void {
    this.inventoryService.deleteVM(this.virtualNodes)
      .subscribe(this.goBack);
  }

  goBack(): void {
    window.history.back();
  }


}