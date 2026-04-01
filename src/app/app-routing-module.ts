import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionPaperLayout } from './Layout/question-paper-layout/question-paper-layout';
import { Home } from './Componets/home/home';
import { DashBoard } from './Layout/dash-board/dash-board';
import { AddUser } from './Componets/add-user/add-user';
import { ListUser } from './Componets/list-user/list-user';
import { ViewUser } from './Componets/view-user/view-user';
import { EditUser } from './Componets/edit-user/edit-user';
import {AuthGuard} from './Guard/auth-guard'
import { QuestionWrapper } from './Componets/question-wrapper/question-wrapper';
import { RoleGuard } from './Guard/role-guard';
import { QuestionPaperComponent } from './Componets/question-paper-component/question-paper-component';

const routes: Routes = [
  {path : "" , component : Home , title : "Home"},
  {path : "dashboard" , 
    component : DashBoard , 
    title : "DashBoard",
    /** For DashBoard Route Gaurd */
    canActivate : [AuthGuard],
    /** For child Routes Gaurd */
    canActivateChild : [RoleGuard],
    children : [
      {path : "", component : ListUser ,data :{roles : ['Admin','User']}},
      {path : "addUser", component : AddUser , title : "Add User",data :{roles : ['Admin']}},
      {path : "questionPaper", component : QuestionPaperComponent , title : "Question Paper" ,data :{roles : ['Admin','User']}},
      {path : "questionPaper/questions/:id", component : QuestionWrapper , title : "Questions" ,data :{roles : ['Admin','User']}},
      {path : "viewUser/:id", component : ViewUser , title : "View User" ,data :{roles : ['Admin','User'] , checkOwnership: true}},
      {path : "editUser/:id", component : EditUser , title : "Edit User" ,data :{roles : ['Admin','User'] , checkOwnership: true}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
