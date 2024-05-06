import { environment } from 'src/environments/environment';
const currentUrl = `${window.location.protocol}//${window.location.host}`;
export class Constants {
  public static stsAuthority = environment.identityUrl;
  public static clientId = 'zine.admin';
  public static clientRoot = currentUrl;
  public static clientScope = getAllAllowedScopes();
  public static apiRoot = environment.apiUrl;
}

function getAllAllowedScopes() {
  return [
    'openid',
    'profile',
    'read', 'write', 'delete',
  ].join(' ');
}
