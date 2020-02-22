import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IState, UserListItem } from 'src/app/store/reducers';
import { getUserList } from 'src/app/store/actions/users.actions';
import { selectUserList } from 'src/app/store/selectors/users.selectors';
import { takeUntil, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  data: UserListItem[] = [];
  destr$: Subject<boolean> = new Subject();
  visibleColumns: string[] = ['name', 'email'];

  constructor(
    private store: Store<IState>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.store.dispatch(getUserList());

    this.store.select(selectUserList)
      .pipe(
        filter(data => !!data),
        takeUntil(this.destr$)
      ).subscribe(data => {
        this.data = data;
      });
  }

  selectRow(user: UserListItem) {
    this.router.navigate([`users/${user.id}`]);
  }

  ngOnDestroy(): void {
    this.destr$.next(true);
    this.destr$.complete();
  }
}
