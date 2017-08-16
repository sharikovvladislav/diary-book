import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';
import { LulDiaryComponent } from './containers/lul';
import { EntryEditDialogComponent } from './containers/edit-entry-dialog';
import { EntryCreateDialogComponent } from './containers/create-entry-dialog';
import { EntryEditContainerComponent } from './containers/entry-edit-container';
import { EntryCreateContainerComponent } from './containers/entry-create-container';
import { MyDairyPageComponent } from './containers/my-dairy-page';
import { DiaryEffect } from './effects/diary.effect';

import { DialogFactoryService } from './services/dialog-factory';

import { reducers } from './reducers';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    CoreModule,
    RouterModule.forChild([
      { path: '', component: MyDairyPageComponent },
    ]),

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('diary', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([DiaryEffect]),
  ],
  declarations: [
    LulDiaryComponent,
    EntryEditDialogComponent,
    EntryCreateDialogComponent,
    EntryEditContainerComponent,
    EntryCreateContainerComponent,
    MyDairyPageComponent,
  ],
  providers: [DialogFactoryService],
})
export class DiaryModule {}
