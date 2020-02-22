import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IState, UserDetails } from 'src/app/store/reducers';
import { getUserDetails, resetUserDetails } from 'src/app/store/actions/users.actions';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { selectUserDetails } from 'src/app/store/selectors/users.selectors';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  id: number;
  destr$: Subject<boolean> = new Subject();
  user: UserDetails;

  constructor(
    private store: Store<IState>,
    private activeRouter: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activeRouter.params
      .pipe(
        takeUntil(this.destr$)
      )
      .subscribe(params => {
        this.store.dispatch(getUserDetails({ id: params.id }));
      });

    this.store.pipe(
      select(selectUserDetails),
      filter(data => !!data),
      takeUntil(this.destr$)
    ).subscribe(data => this.user = data);
  }

  ngOnDestroy(): void {
    this.destr$.next(true);
    this.destr$.complete();

    this.store.dispatch(resetUserDetails());
  }
}
