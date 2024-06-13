 
 import * as microsoftTeams from "@microsoft/teams-js";
 
 export const getAccessToken = async () => {
   return new Promise((resolve, reject) => {
     microsoftTeams.initialize();

     microsoftTeams.authentication.getAuthToken({
       successCallback: (token) => {
             resolve(token);
       },
       failureCallback: (error) => {
         console.error("Error getting token: ", error);
         reject(error);
       }
     });
   });
 };




