// import { FactoryProvider } from "@angular/core";
// import { Http } from '@angular/http';
//
import { AllCheckService } from "./allcheck.service";
import { BreadcrumbService } from "./breadcrumb.service";
import { PersonService, PersonConfig, Person } from "./person.service";
// import { DragService } from "./drag.service";
// import { ModulePermissionService } from "./module-permission.service";
// import { FlowRecordService } from "./flow-record.service";
export { BreadcrumbService, AllCheckService, PersonService, PersonConfig, Person };
//
//
export let SHARED_PROVIDERS = [
  BreadcrumbService,
  AllCheckService,
  PersonService,
  PersonConfig
];
