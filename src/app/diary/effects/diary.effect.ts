import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../reducers';

import { DiaryEntryService } from '../services/diary-entry';
import * as diaryEntry from '../actions/diary-entries';

import { DiaryEntry } from '../../shared/models/diary-entry';

import { DialogFactoryService } from '../services/dialog-factory';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class DiaryEffects {
  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(diaryEntry.LOAD_LIST)
    .withLatestFrom(this.store)
    .filter(([action, state]) => fromRoot.getUserIsLoggedIn(state))
    .switchMap(() => {
      return this.diaryEntryService.retrieveEntries()
        .map((diaryEntries: DiaryEntry[]) => new diaryEntry.LoadListSuccessAction(diaryEntries))
        .catch(() => of(new diaryEntry.LoadListFailureAction([])));
    });

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(diaryEntry.CREATE_ENTRY)
    .withLatestFrom(this.store)
    .switchMap(([action, state]: [any, any]) => {
      const uid = fromRoot.getUserUid(state);

      return this.diaryEntryService.createEntry(uid, action.payload)
        .map((newEntryData: DiaryEntry) => new diaryEntry.CreateEntrySuccessAction(newEntryData))
        .do(() => this.dialogFactory.closeCreateEntryDialog())
        .catch(() => of(new diaryEntry.CreateEntryFailureAction([])));
    });

  @Effect()
  edit$: Observable<Action> = this.actions$
    .ofType(diaryEntry.EDIT_ENTRY)
    .switchMap((action: diaryEntry.EditEntryAction) => {
      return this.diaryEntryService.updateEntry(action.payload)
        .map((updatedEntryData: DiaryEntry) =>
          new diaryEntry.EditEntrySuccessAction(updatedEntryData)
        )
        .do(() => this.store.dispatch(new diaryEntry.LoadListAction()))
        .do(() => this.dialogFactory.closeEditEntryDialog())
        .catch(() => of(new diaryEntry.EditEntryFailureAction(null)));
    });

  constructor(
    private actions$: Actions,
    private diaryEntryService: DiaryEntryService,
    private dialogFactory: DialogFactoryService,
    private store: Store<fromRoot.State>,
  ) { }
}
