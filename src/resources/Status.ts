import HTTPMethod from '../constants';
import Base from './_Base';

interface IdcardRequestParam {
  identity: string;
  issueDate: string;
  userName: string;
  secret_mode?: boolean;
}
export class Status extends Base {
  protected _host = 'https://api3.useb.co.kr/status';

  idcard = this.callAPIMethod<IdcardRequestParam>({
    method: HTTPMethod.POST,
    path: '/idcard',
    requiredParams: ['identity', 'issueDate', 'userName'],
  });
}
