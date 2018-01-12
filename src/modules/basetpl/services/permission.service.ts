import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';

import { PersonService } from 'shared/services/person.service';

@Injectable()
export class PermissionService implements CanActivateChild {

  permission: Promise<boolean>;

  constructor(private personService: PersonService) {
    this.permission = this.personService.login().then(() => true);
  }

  canActivateChild() {
    return this.permission;
  }
}