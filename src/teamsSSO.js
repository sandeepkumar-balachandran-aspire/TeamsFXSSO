 import * as msal from "@azure/msal-browser";
 import * as microsoftTeams from "@microsoft/teams-js";
 import { msalConfig, loginRequest } from "./authConfig";

 const msalInstance = new msal.PublicClientApplication(msalConfig);
 await msalInstance.initialize();
 export const getAccessToken = async () => {
   return new Promise((resolve, reject) => {
     microsoftTeams.initialize();

     microsoftTeams.authentication.getAuthToken({
       successCallback: (token) => {
             return token;
       },
       failureCallback: (error) => {
         console.error("Error getting token: ", error);
         reject(error);
       }
     });
   });
 };

