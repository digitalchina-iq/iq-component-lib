import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class BasetplService {
  constructor(private http: Http) { };

  getNav() {
    return this.http.get(environment.server + 'classes/Menu', {params:{order:'createdAt'}}).toPromise().then(response => response.json());
  }

  getCodeReviewUser() {
    return this.http.get(environment.server + `cloudQuery?cql=select * from Cr order by createdAt desc limit 1`).toPromise().then(response => response.json());
  }
}
