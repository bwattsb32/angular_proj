import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // PolarArea
  public polarAreaChartLabels:string[] = ['Virtual Nodes', 'Physical Nodes', 'Document Templates', 'VM Templates', 'Software Packages', 'Operating Systems'];
  public polarAreaChartData:number[] = [30, 5, 4, 10, 20, 3];
  public polarAreaLegend:boolean = true;

  public polarAreaChartType:string = 'polarArea';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}