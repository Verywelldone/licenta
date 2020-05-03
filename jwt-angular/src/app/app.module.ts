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
import { CarouselComponent } from './components/main-pages/home/carousel/carousel.component';
import { SocialLinksComponent } from './components/main-pages/home/social-links/social-links.component';
import { JumbotronComponent } from './components/main-pages/home/jumbotron/jumbotron.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MeetTheTeamComponent } from './components/main-pages/home/meet-the-team/meet-the-team.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { BecomeClientComponent } from './components/boards/board-user/become-client/become-client.component';
import { BecomeHostComponent } from './components/boards/board-user/become-host/become-host.component';
import { AgmCoreModule } from '@agm/core';
import { BecomeHostFormComponent } from './components/boards/board-user/become-host-form/become-host-form.component';
import {FileUploadModule} from 'ng2-file-upload';
import { DndDirective } from './components/boards/board-user/become-host-form/dnd.directive';
import { UserTcsComponent } from './components/boards/board-user/user-tcs/user-tcs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';

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
    BecomeHostComponent,
    BecomeHostFormComponent,
    DndDirective,
    UserTcsComponent
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
        MaterialModule
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
