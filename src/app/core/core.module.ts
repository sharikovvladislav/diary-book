import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app';
import { NotFoundPageComponent } from './containers/not-found-page';
import { LayoutComponent } from './components/layout';
import { NavItemComponent } from './components/nav-item';
import { SidenavComponent } from './components/sidenav';
import { ToolbarComponent } from './components/toolbar';
import { NotLoggedInComponent } from './components/not-logged-in';
import { LulComponent } from './containers/lul';
import { KekComponent } from './containers/kek';
import { CommonShowIfLoggedInComponent } from './containers/common-show-if-logged-in';
import { LoaderComponent } from './containers/loader';

// import { GoogleBooksService } from './services/google-books';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LulComponent,
  KekComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
  NotLoggedInComponent,
  CommonShowIfLoggedInComponent,
  LoaderComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [/*GoogleBooksService*/],
    };
  }
}
