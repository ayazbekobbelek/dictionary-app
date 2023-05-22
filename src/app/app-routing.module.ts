import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {WordDetailComponent} from "./components/word-detail/word-detail.component";


/**
 * Specifies application routes.
 * '' path redirects to 'home' by default.
 * 'home' path loads HomeComponent and has a child route 'word' that loads WordDetailComponent.
 */
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
      { path: 'word', component: WordDetailComponent }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
