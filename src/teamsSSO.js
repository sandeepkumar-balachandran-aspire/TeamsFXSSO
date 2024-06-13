// import * as msal from "@azure/msal-browser";
// import * as microsoftTeams from "@microsoft/teams-js";
// import { msalConfig, loginRequest } from "./authConfig";

// const msalInstance = new msal.PublicClientApplication(msalConfig);

// export const getAccessToken = async () => {
//   return new Promise((resolve, reject) => {
//     microsoftTeams.initialize();

//     microsoftTeams.authentication.getAuthToken({
//       successCallback: (token) => {
//         msalInstance.handleRedirectPromise().then((tokenResponse) => {
//           if (tokenResponse) {
//             resolve(tokenResponse.accessToken);
//           } else {
//             msalInstance.acquireTokenSilent(loginRequest).then((tokenResponse) => {
//               resolve(tokenResponse.accessToken);
//             }).catch((error) => {
//               msalInstance.acquireTokenRedirect(loginRequest);
//             });
//           }
//         });
//       },
//       failureCallback: (error) => {
//         console.error("Error getting token: ", error);
//         reject(error);
//       }
//     });
//   });
// };

// src/auth.js
import { msalInstance, loginRequest, teamsfxInstance } from "./authConfig";

export const initializeTeamsFx = async () => {
    await teamsfxInstance.initialize();
};

export const getAccessToken = async () => {
    await initializeTeamsFx();
    const tokenResponse = await msalInstance.acquireTokenSilent(loginRequest).catch(() => {
        return msalInstance.acquireTokenRedirect(loginRequest);
    });

    return tokenResponse.accessToken;
};
