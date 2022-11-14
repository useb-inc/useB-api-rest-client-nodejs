import HTTPMethod from '../constants';
import { UsebAPI } from '../UsebAPI';

interface MethodSpec {
  method?: HTTPMethod;
  path: string;
  urlParam?: string | null;
  requiredParams?: string[] | null;
}
export class Base {
  constructor(private _apiClass: UsebAPI) {}

  protected callAPIMethod(spec: MethodSpec) {
    const { path, method, urlParam, requiredParams } = spec;
    return function (param: any) {
      console.log(this.host);
    };
  }
}
export default Base;
