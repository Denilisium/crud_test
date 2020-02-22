import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { ConfigService } from 'src/app/shared/config.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(
    private data: DataService,
    private config: ConfigService,
  ) {
  }

  getUserList() {
    return this.data.getData(this.config.usersUrl)
      .pipe(map(resp => resp.data));
  }

  getUserById(id: number) {
    return this.data.getData(this.config.getUserUrl(id))
      .pipe(map(resp => resp.data));
  }
}
