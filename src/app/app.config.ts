import { InjectionToken } from "@angular/core";
import { IAppConfig } from "./appconfig";

export let APP_CONFIG = new InjectionToken("app.config");

export const AppConfig: IAppConfig = {    
    //service_url: "http://localhost:9090/api/", 
    service_url: "http://cmoe3lws02.cmoa3s.com:9090/api/", 
    adminwiki_url: "http://cmoe3lws04.cmoa3s.com:9091/api/",
    authentication_url: "http://cmoe0ldex01.cmoa3s.com:5556/dex/",
    redirectUri: "/dashboard",
    /* AUTHENTICATION for LOCALDEV */
    //clientId: "portal-local"

    /* AUTHENTICATION for DEV */
    clientId: "portal-dev"

    /* AUTHENTICATION for ADMIN */
    //clientId: "portal-admin"
};