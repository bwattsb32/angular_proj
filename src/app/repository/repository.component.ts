import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})

export class RepositoryComponent {
    title = 'File Repository';

    //*****Need to fix this...should read from properties file  ******* 
    public uploader:FileUploader = new FileUploader({url:'http://cmoe3lws02.cmoa3s.com:9090/api/upload'});
    //*****Need to fix this...should read from properties file  *******
}