import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ProfileEditorComponent } from "./components/profile-editor/profile-editor.component";


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: PermissionsService.UPDATE_USER,
    component: UserManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: PermissionsService.REGISTER_USER,
    component: UserManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit_profile',
    component: ProfileEditorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
