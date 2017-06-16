import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { APP_CONFIG } from './app.config';
import { IAppConfig } from "./appconfig";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Zero2Cloud™ Portal";
  securityMessage = "...important message appears here...";
  today = new Date();
  version = "1.1.0"
  footerMessage = "[Version :" + this.version + "] Copyright © 2015-2017 Dynamic Technology Systems, Inc." + this.today; 
  menuState:string = 'out';

  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  constructor(private oauthService: OAuthService,
              @Inject(APP_CONFIG) private config: IAppConfig) {
 
        
        // URL of the SPA to redirect the user to after login
        this.oauthService.redirectUri = window.location.origin + config.redirectUri; //"http://localhost:4200/dashboard";

        // The SPA's id. Register SPA with this id at the auth-server
        this.oauthService.clientId = config.clientId; //"portal-local";

        // set the scope for the permissions the client should request
        this.oauthService.scope = "openid profile email offline_access";

        // Login-Url
        this.oauthService.loginUrl = config.authentication_url +"auth?client_id=" + this.oauthService.clientId + "&redirect_uri=" + this.oauthService.redirectUri + "&response_type=code&scope=audience%3Aserver%3Aclient_id%3A" + this.oauthService.clientId + "+" + this.oauthService.scope + "&state=InitialContext"; //Id-Provider?


        this.oauthService.dummyClientSecret = "ZXhhbXBsZS1hcHAtc2VjcmV0";

        // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
        // OAuth2-based access_token
        this.oauthService.oidc = true;

        // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
        // instead of localStorage
        this.oauthService.setStorage(sessionStorage);

        // To also enable single-sign-out set the url for your auth-server's logout-endpoint here
        this.oauthService.logoutUrl = config.authentication_url +"connect/endsession?id_token={{id_token}}";

        // This method just tries to parse the token(s) within the url when
        // the auth-server redirects the user back to the web-app
        // It dosn't send the user the the login page
        this.oauthService.tryLogin({
        });      


  }

}