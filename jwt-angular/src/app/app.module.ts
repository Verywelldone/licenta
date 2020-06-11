import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardAdminComponent} from './components/boards/board-admin/board-admin.component';
import {BoardModeratorComponent} from './components/boards/board-moderator/board-moderator.component';
import {HomeComponent} from './components/main-pages/home/home.component';
import {LoginComponent} from './components/user/login/login.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {RegisterComponent} from './components/user/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {CarouselComponent} from './components/main-pages/home/carousel/carousel.component';
import {SocialLinksComponent} from './components/main-pages/home/social-links/social-links.component';
import {JumbotronComponent} from './components/main-pages/home/jumbotron/jumbotron.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {MeetTheTeamComponent} from './components/main-pages/home/meet-the-team/meet-the-team.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {AgmCoreModule} from '@agm/core';
import {FileUploadModule} from 'ng2-file-upload';
import {DndDirective} from './components/boards/board-user/sitter/become-sitter-form/dnd.directive';
import {UserTcsComponent} from './components/shared/user-tcs/user-tcs.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import {SitterProfileComponent} from './components/boards/board-user/sitter/sitter-dashboard/sitter-profile/sitter-profile.component';
import {BecomeClientComponent} from './components/boards/board-user/client/become-client/become-client.component';
import {BecomeSitterComponent} from './components/boards/board-user/sitter/become-sitter/become-sitter.component';
import {BecomeSitterFormComponent} from './components/boards/board-user/sitter/become-sitter-form/become-sitter-form.component';
import {SitterDashboardComponent} from './components/boards/board-user/sitter/sitter-dashboard/sitter-dashboard.component';
import {SitterPendingRequestsComponent} from './components/boards/board-user/sitter/sitter-dashboard/sitter-pending-requests/sitter-pending-requests.component';
import {SitterAcceptedRequestsComponent} from './components/boards/board-user/sitter/sitter-dashboard/sitter-accepted-requests/sitter-accepted-requests.component';
import {SitterDeclinedRequestsComponent} from './components/boards/board-user/sitter/sitter-dashboard/sitter-declined-requests/sitter-declined-requests.component';
import { ChatComponent } from './components/shared/chat/chat.component';
import { ClientDashboardComponent } from './components/boards/board-user/client/client-dashboard/client-dashboard.component';
import { ClientPendingRequestsComponent } from './components/boards/board-user/client/client-dashboard/client-pending-requests/client-pending-requests.component';
import { ClientDeclinedRequestsComponent } from './components/boards/board-user/client/client-dashboard/client-declined-requests/client-declined-requests.component';
import { ClientAcceptedRequestsComponent } from './components/boards/board-user/client/client-dashboard/client-accepted-requests/client-accepted-requests.component';
// import { CometChat } from '@cometchat-pro/chat';

// import { CometchatAngularUiKitModule } from 'src/libs/cometchat-angular-ui-kit/src/lib/cometchat-angular-ui-kit.module';

import { CometchatAngularUiKitModule } from '../libs/cometchat-angular-ui-kit/src/lib/cometchat-angular-ui-kit.module';
import { UpdateSitterProfileComponent } from './components/boards/board-user/sitter/sitter-dashboard/update-sitter-profile/update-sitter-profile.component';
import { CdkDetailRowDirective } from './components/boards/board-admin/cdk-detail-row.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
// @ts-ignore
@NgModule({
    declarations: [
        AppComponent,
        BoardAdminComponent,
        BoardModeratorComponent,
        HomeComponent,
        LoginComponent,
        ProfileComponent,
        RegisterComponent,
        CarouselComponent,
        SocialLinksComponent,
        JumbotronComponent,
        FooterComponent,
        MeetTheTeamComponent,
        NavbarComponent,
        BecomeClientComponent,
        BecomeSitterComponent,
        BecomeSitterFormComponent,
        DndDirective,
        UserTcsComponent,
        SitterProfileComponent,
        SitterDashboardComponent,
        SitterPendingRequestsComponent,
        SitterAcceptedRequestsComponent,
        SitterDeclinedRequestsComponent,
        ChatComponent,
        ClientDashboardComponent,
        ClientPendingRequestsComponent,
        ClientDeclinedRequestsComponent,
        ClientAcceptedRequestsComponent,
        UpdateSitterProfileComponent,
        UpdateSitterProfileComponent,
        CdkDetailRowDirective,
        UserProfileComponent,
        ForgotPasswordComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYeSZf4AVXQ3CNVDTcU3i_JCIv8001CLA'
    }),
    FileUploadModule,
    BrowserAnimationsModule,
    MaterialModule,
    CometchatAngularUiKitModule,
    NgbModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
