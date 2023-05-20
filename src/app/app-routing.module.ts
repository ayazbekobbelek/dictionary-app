import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {WordDetailComponent} from "./components/word-detail/word-detail.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'word', component: WordDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
