import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';

import { DocTemplateService } from './documentation/doc-templates/doc-template.service';
import { InventoryService } from './inventory/inventory.service';

import { DeploymentForm } from './inventory/deployment-form.component';
import { DeleteVMPage } from './inventory/deleteVM-page.component';

import { APP_CONFIG, AppConfig } from './app.config';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccessComponent } from './access/access.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { RepositoryComponent } from './repository/repository.component';
import { AssessmentsComponent } from './documentation/assessments/assessments.component';
import { DocTemplatesComponent } from './documentation/doc-templates/doc-templates.component';
import { DocumentsComponent } from './documentation/documents/documents.component';
import { DocTemplateDetailComponentComponent } from './documentation/doc-templates/doc-template-detail-component/doc-template-detail-component.component';
import { SplashComponent } from './splash/splash.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    AccessComponent,
    ConfigurationComponent,
    InventoryComponent,
    DocumentationComponent,
    RepositoryComponent,
    AssessmentsComponent,
    DocTemplatesComponent,
    DocumentsComponent,
    DocTemplateDetailComponentComponent,
    DeploymentForm,
    DeleteVMPage,
    SplashComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    OAuthModule.forRoot(),
    CoreModule,
    SharedModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/splash', pathMatch: 'full' },
      { path: 'splash', component: SplashComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'access', component: AccessComponent },
      { path: 'configuration', component: ConfigurationComponent },
      // { path: 'inventory', component: InventoryComponent },
      { path: 'inventory/deploy', component: DeploymentForm },
      { path: 'inventory/deleteVM', component: DeleteVMPage },

	    // { path: 'inventory/hardware', component: HardwareInventoryComponent },
	    // { path: 'inventory/software', component: SoftwareInventoryComponent },
	    // { path: 'inventory/virtualware', component: VirtualwareInventoryComponent },

      { path: 'documentation', component: DocumentationComponent },
      { path: 'repository', component: RepositoryComponent },
      { path: 'documentation/templates', component: DocTemplatesComponent },
      { path: 'documentation/templates/:id', component: DocTemplateDetailComponentComponent },
      { path: 'documentation/assessments', component: AssessmentsComponent },
      { path: 'documentation/documents', component: DocumentsComponent },
      { path: 'inventory/:type', loadChildren: 'app/inventory/inventory-view/inventories.module#InventoriesModule' },
      { path: 'inventory/:id/:type', loadChildren: 'app/inventory/inventory-routing/inventory.module#InventoryModule' },
    ])
  ],
  providers: [
    DocTemplateService,
    InventoryService,
    { provide: APP_CONFIG, useValue: AppConfig }],

  bootstrap: [AppComponent]
})
export class AppModule { }
