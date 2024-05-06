// This api will come in the next version

import { AuthConfig } from 'angular-oauth2-oidc';
import { Constants } from './constants';

export const authPasswordFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: Constants.stsAuthority,
  tokenEndpoint: `${Constants.stsAuthority}/connect/token`,
  userinfoEndpoint: `${Constants.stsAuthority}/connect/userinfo`,
  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: `${Constants.clientRoot}/assets/silent-refresh.html`,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: Constants.clientId,

  dummyClientSecret: 'secret',

  responseType: "code id_token token",
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope:  Constants.clientScope,

  showDebugInformation: true,

  oidc: false,
  requireHttps: false
};
