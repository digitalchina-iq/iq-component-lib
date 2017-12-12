
/**
导出为core里面所有资源
*/
import { Http, HttpModule, ConnectionBackend, RequestOptions, XHRBackend} from '@angular/http';
import { FactoryProvider } from "@angular/core";
import { iqHttpService } from "./iq-http.service";
import { WindowService } from "./window.service";
import { CustomSettingService } from "./custom-setting.service";
import { HeaderService } from './header.service';


export { URLSearchParams,RequestOptions } from "./iq-http.service";

export function httpFactory(xhrBackend, requestOptions, windowservice) {
  return new iqHttpService(xhrBackend, requestOptions, windowservice);
};
export let iqHttpProvider: FactoryProvider =
{ provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions,WindowService ] };

export { iqHttpService, WindowService, CustomSettingService, HeaderService };

export let CORE_PROVIDERS = [iqHttpProvider,WindowService,CustomSettingService,HeaderService];
