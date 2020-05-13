import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/main-pages/home/home.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {BoardModeratorComponent} from './components/boards/board-moderator/board-moderator.component';
import {BoardAdminComponent} from './components/boards/board-admin/board-admin.component';
import {BecomeHostComponent} from './components/boards/board-user/become-host/become-host.component';
import {BecomeClientComponent} from './components/boards/board-user/become-client/become-client.component';
import {BecomeSitterFormComponent} from './components/boards/board-user/become-sitter-form/become-sitter-form.component';
import {UserTcsComponent} from './components/boards/board-user/user-tcs/user-tcs.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  // {path: 'user', component: BoardUserComponent},
  {path: 'become-host', component: BecomeHostComponent},
  {path: 'become-sitter-form', component: BecomeSitterFormComponent},
  {path: 'become-client', component: BecomeClientComponent},
  {path: 'mod', component: BoardModeratorComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'tcs', component: UserTcsComponent},

  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
