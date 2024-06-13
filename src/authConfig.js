export const msalConfig = {
  auth: {
    clientId: "6375753e-3b1b-4eac-a731-501b08b3bbf4",
    authority: "https://login.microsoftonline.com/42f65d85-0044-4e88-9d17-5aeff505072a",
    redirectUri: "http://localhost:3000/auth-end", // or your production URL
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  }
};

export const loginRequest = {
  scopes: ["User.Read"]
};