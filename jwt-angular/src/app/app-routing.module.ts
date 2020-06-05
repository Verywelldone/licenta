import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/main-pages/home/home.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {BoardModeratorComponent} from './components/boards/board-moderator/board-moderator.component';
import {BoardAdminComponent} from './components/boards/board-admin/board-admin.component';
import {BecomeClientComponent} from './components/boards/board-user/client/become-client/become-client.component';
import {BecomeSitterFormComponent} from './components/boards/board-user/sitter/become-sitter-form/become-sitter-form.component';
import {UserTcsComponent} from './components/shared/user-tcs/user-tcs.component';
import {SitterProfileComponent} from './components/boards/board-user/sitter/sitter-dashboard/sitter-profile/sitter-profile.component';
import {BecomeSitterComponent} from './components/boards/board-user/sitter/become-sitter/become-sitter.component';
import {SitterDashboardComponent} from './components/boards/board-user/sitter/sitter-dashboard/sitter-dashboard.component';
import {ChatComponent} from './components/shared/chat/chat.component';
import {ClientDashboardComponent} from './components/boards/board-user/client/client-dashboard/client-dashboard.component';
import {CometchatEmbeddedComponent} from "../libs/cometchat-angular-ui-kit/src/lib/cometchat-embedded/cometchat-embedded.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  // {path: 'user', component: BoardUserComponent},

  {path: 'become-sitter', component: BecomeSitterComponent},
  {path: 'become-sitter-form', component: BecomeSitterFormComponent},
  {path: 'sitter-profile', component: SitterDashboardComponent},

  {path: 'become-client', component: BecomeClientComponent},
  {path: 'client-dashboard', component: ClientDashboardComponent},

  {path: 'mod', component: BoardModeratorComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'tcs', component: UserTcsComponent},
  {path: 'chat', component: CometchatEmbeddedComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
