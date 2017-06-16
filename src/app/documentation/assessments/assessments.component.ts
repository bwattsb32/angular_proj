import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})
export class AssessmentsComponent implements OnInit {
    assmtregv1: string;
    constructor() {
        this.assmtregv1 = 'AssmtegComponent documents';
    }

    ngOnInit() {
    }

}