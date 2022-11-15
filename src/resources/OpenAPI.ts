import HTTPMethod from '../constants';
import Base from './_Base';

export class OpenAPI extends Base {
  protected _host = 'https://openapi.useb.co.kr';

  realname = this.callAPIMethod({
    method: HTTPMethod.POST,
    path: '/realname',
  });
}
