import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';

@Injectable()
export class DataService {

  constructor() {
  }

  getData(url, params?, additionalOptions?, additionalConfigOptions?): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
    };
    const request = axios.get(url, { headers, params, ...additionalOptions, ...additionalConfigOptions });
    return from(request);
  }

  create(url, data, config?) {
    const request = axios.post(url, data, config);
    return from(request);
  }

  patch(url, data) {
    const request = axios.patch(url, data);
    return from(request);
  }

  update(url, data, config?) {
    const request = axios.put(url, data, config);
    return from(request);
  }

  remove(url, body) {
    const request = axios.delete(url, { data: body });
    return from(request);
  }
}
