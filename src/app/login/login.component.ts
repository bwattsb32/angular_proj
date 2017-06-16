import { Component, OnInit } from '@angular/core';
import { OAuthService } from "angular-oauth2-oidc";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

    password: string;
    loginFailed: boolean = false;
    isAvailable = false;
    public errorMsg = '';

    constructor(private oauthService: OAuthService) {
    }

    public login() {
        this.oauthService.initImplicitFlow();
    }

    public logout() {
        this.oauthService.logOut();
    }

    public get userName() {
        
        var claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;

        return claims.given_name;
    }

}