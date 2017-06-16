import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../core/services/data.service';
import { IHardware, IDeviceType } from '../shared/interfaces';
import { KickerService, KickerMessageType } from '../core/kicker/kicker.service';

@Component({
  moduleId: module.id,
  selector: 'z2c-hardware-add',
  templateUrl: 'hardware-add.component.html',

})
export class HardwareAddComponent implements OnInit {

  hardware: IHardware =
  {
    "id": null,
    "type": '',
    "tag:cores": '',
    "tag:cpus": '',
    "tag:ipAddress": '',
    "tag:manufacturer": '',
    "tag:memory": '',
    "tag:modelName": '',
    "tag:vendor": '',
    "sys:clusterSubjectId":
    { id: '' },

    "sys:description": '',
    "sys:deviceType": 'Physical server',
    "sys:endOfLife": null,
    "http://www.dts-inc.com/systemspec#endOfLife": '',
    "sys:evaluatedAssuranceLevel": '',
    "sys:fips": false,
    "sys:hasTemplateNode": '',
    "sys:internetAccess": false,
    "sys:isDeviceOf": { id: '' },
    "sys:isDeviceOfPrefLbl": '',//read only
    "sys:logicalLocation": '',
    "sys:physicalLocation": '',
    "sys:role": '',
    "sys:sensitiveInfo": false,
    "sys:tmplPrfLbl": '',
    "sys:vlan": '',
    "sys:webServerType": '',
    "skos:altLabel": '',
    "skos:clusterPrefLabel": '',
    "skos:prefLabel": '',

  };

  defaultStr = 'Select a Device Type';
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Add';
  @ViewChild('hardwareForm') hardwareForm: NgForm;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private kicker: KickerService,
    ) { }

  deviceTypes: IDeviceType[] = [];
insertedhardware:any[];

  ngOnInit() {
    this.getDeviceTypeList();
  }

  getDeviceTypeList(): void {
    this.dataService
      .getDeviceType()
      .subscribe(deviceTypes => {
        console.log("getDeviceType: " + JSON.stringify(deviceTypes, null, 2));
        this.deviceTypes = deviceTypes;

      });
  }
 
  submit() {
  
   // console.log("Submitted:" + JSON.stringify(this.hardware));

   // console.log(this.hardware["id"] === null);
  
    this.dataService.insertHardware(this.hardware).subscribe(insertedhardware => {
     console.log("inserted:" + JSON.stringify(insertedhardware, null, 2));
       this.insertedhardware =insertedhardware;
   var re = "Successfully added"; 
      if (this.insertedhardware) {
        //Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
        this.kicker.kick(JSON.stringify(insertedhardware, null, 2), KickerMessageType.Success);
        this.hardwareForm.form.markAsPristine();
       // this.hardwareForm.reset();
       // this.router.navigate(['/hardwares']);
      } else {
      //  console.log("no inserted:");
        const msg = 'Unable to insert hardwares';
        this.kicker.kick(msg, KickerMessageType.Danger);
        this.errorMessage = msg;
      }
    },
      (err: any) => {console.log(err)
       this.errorMessage = err;}
      );
      
  }

  cancel(event: Event) {
    event.preventDefault();
   this.router.navigate(['/inventory','all']);

  }




  }

