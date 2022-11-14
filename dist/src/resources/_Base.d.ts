import HTTPMethod from '../constants';
import { UsebAPI } from '../UsebAPI';
interface MethodSpec {
    method?: HTTPMethod;
    path: string;
    urlParam?: string | null;
    requiredParams?: string[] | null;
}
export declare class Base {
    private _apiClass;
    constructor(_apiClass: UsebAPI);
    protected callAPIMethod(spec: MethodSpec): void;
}
export default Base;
