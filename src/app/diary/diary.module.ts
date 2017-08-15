import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';
import { DiaryEffect } from './effects/diary.effect';

import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    // RouterModule.forChild([
    //   { path: 'find', component: FindBookPageComponent },
    //   {
    //     path: ':id',
    //     component: ViewBookPageComponent,
    //   },
    //   { path: '', component: CollectionPageComponent },
    // ]),

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
    // FindBookPageComponent,
    // ViewBookPageComponent,
    // SelectedBookPageComponent,
    // CollectionPageComponent,
  ],
  providers: [/*BookExistsGuard*/],
})
export class DiaryModule {}
