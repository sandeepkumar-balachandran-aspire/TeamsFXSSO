 
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
// src/auth.js
// src/auth.js
import { msalInstance, loginRequest } from "./authConfig";
import * as microsoftTeams from "@microsoft/teams-js";

export const getAccessToken = async () => {
    return new Promise((resolve, reject) => {
        microsoftTeams.initialize(() => {
            microsoftTeams.getContext(async (context) => {
                try {
                    let accounts = msalInstance.getAllAccounts();
                    if (accounts.length === 0) {
                        // No user signed in, trigger login popup
                        const loginResponse = await msalInstance.loginPopup(loginRequest);
                        accounts = [loginResponse.account];
                    }

                    const response = await msalInstance.acquireTokenSilent({
                        ...loginRequest,
                        account: accounts[0],
                    });

                    resolve(response.accessToken);
                } catch (error) {
                    console.error("Error acquiring Graph token: ", error);

                    if (error instanceof msal.InteractionRequiredAuthError) {
                        // Fallback to popup in case of silent token acquisition failure
                        try {
                            const response = await msalInstance.acquireTokenPopup(loginRequest);
                            resolve(response.accessToken);
                        } catch (popupError) {
                            console.error("Error acquiring token via popup: ", popupError);
                            reject(popupError);
                        }
                    } else {
                        reject(error);
                    }
                }
            });
        });
    });
};


