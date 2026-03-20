import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { DashBoard } from './Layout/dash-board/dash-board';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Home } from './Componets/home/home';
import { Paragraph } from './Componets/paragraph/paragraph';
import { OneLine } from './Componets/one-line/one-line';
import { Mcq } from './Componets/mcq/mcq';
import { Checkbox } from './Componets/checkbox/checkbox';
import { QuestionPaper } from './service/question-paper';
import { Question } from './Componets/question/question';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { User } from './service/user';
import { QuestionPaperLayout } from './Layout/question-paper-layout/question-paper-layout';
import { AddUser } from './Componets/add-user/add-user';
import { ListUser } from './Componets/list-user/list-user';
import { ViewUser } from './Componets/view-user/view-user';
import { EditUser } from './Componets/edit-user/edit-user';
import { QuestionWrapper } from './Componets/question-wrapper/question-wrapper';
import { Auth } from './service/auth';
import { AuthInterceptor } from './Interceptor/auth-interceptor';

@NgModule({
  declarations: [
    /** Components */
    App,
    DashBoard,
    Home,
    Paragraph,
    OneLine,
    Mcq,
    Checkbox,
    Question,
    QuestionPaperLayout,
    AddUser,
    ListUser,
    ViewUser,
    EditUser,
    QuestionWrapper
  ],
  imports: [
    /** Modules */
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    /** Providers */
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    /** Http Client Configuration */
    provideHttpClient(
      withFetch(),
      /** Interceptor */
      withInterceptors([AuthInterceptor])
    ),
    /** Users defined Services */
    QuestionPaper,
    User,
    Auth
  ],
  bootstrap: [App]
})
export class AppModule { }
