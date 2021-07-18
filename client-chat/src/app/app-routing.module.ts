import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppChatComponent } from './app-chat/app-chat.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chat', component: AppChatComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
