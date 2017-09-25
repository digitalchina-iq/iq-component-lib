
/**
导出为core里面所有资源
*/
import { HttpModule, ConnectionBackend, RequestOptions, XHRBackend} from '@angular/http';
import { FactoryProvider } from "@angular/core";
import { iqHttpService } from "./iq-http.service";


export { URLSearchParams,RequestOptions } from "./iq-http.service";

export function httpFactory(xhrBackend, requestOptions) {
  return new iqHttpService(xhrBackend, requestOptions);
};
export let iqHttpProvider: FactoryProvider =
{ provide: iqHttpService, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] };

export { iqHttpService};

export let CORE_PROVIDERS = [iqHttpProvider];
