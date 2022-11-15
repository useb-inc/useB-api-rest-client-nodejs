import HTTPMethod from '../constants';
import Base from './_Base';

export class Auth extends Base {
  protected _host = 'https://auth.useb.co.kr';

  getClientSecret = this.callAPIMethod({
    method: HTTPMethod.POST,
    path: '/oauth/get-client-secret',
    requiredParams: ['email', 'password'],
  });

  token = this.callAPIMethod({
    method: HTTPMethod.POST,
    path: '/oauth/token',
  });
}
