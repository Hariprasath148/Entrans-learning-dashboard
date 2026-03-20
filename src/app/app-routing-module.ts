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

const routes: Routes = [
  {path : "" , component : Home , title : "Home"},
  {path: "questionPaper", component: QuestionPaperLayout , title : "Quesiton Paper"},
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
      {path : "questions", component : QuestionWrapper , title : "Questions" ,data :{roles : ['Admin','User']}},
      {path : "viewUser/:id", component : ViewUser , title : "View User" ,data :{roles : ['Admin','User']}},
      {path : "editUser/:id", component : EditUser , title : "Edit User" ,data :{roles : ['Admin','User']}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
