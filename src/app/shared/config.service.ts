import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  baseUrl = 'https://jsonplaceholder.typicode.com/';

  usersUrl = `${this.baseUrl}users`;

  getUserUrl(id: number) {
    return `${this.usersUrl}/${id}`;
  }
}
