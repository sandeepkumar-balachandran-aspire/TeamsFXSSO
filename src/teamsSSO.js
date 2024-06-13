 
 //import * as microsoftTeams from "@microsoft/teams-js";
 
 //export const getAccessToken = async () => {
 //  return new Promise((resolve, reject) => {
 //    microsoftTeams.initialize();

 //    microsoftTeams.authentication.getAuthToken({
 //      successCallback: (token) => {
 //            resolve(token);
 //      },
 //      failureCallback: (error) => {
 //        console.error("Error getting token: ", error);
 //        reject(error);
 //      }
 //    });
 //  });
 //};

// src/auth.js
// src/auth.js
import { msalInstance, loginRequest } from "./authConfig";
import * as microsoftTeams from "@microsoft/teams-js";

export const getAccessToken = async () => {
    return new Promise((resolve, reject) => {
        microsoftTeams.initialize();

        microsoftTeams.authentication.getAuthToken({
            successCallback: async (token) => {
                try {
                    const accounts = msalInstance.getAllAccounts();
                    let response;

                    if (accounts.length === 0) {
                        // No user signed in, trigger login popup
                        response = await msalInstance.loginPopup(loginRequest);
                    } else {
                        // User signed in, try to acquire token silently
                        response = await msalInstance.acquireTokenSilent({
                            ...loginRequest,
                            account: accounts[0],
                        });
                    }

                    resolve(response.accessToken);
                } catch (error) {
                    console.error("Error acquiring Graph token: ", error);
                    reject(error);
                }
            },
            failureCallback: (error) => {
                console.error("Error getting token: ", error);
                reject(error);
            }
        });
    });
};

