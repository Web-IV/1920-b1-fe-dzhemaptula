import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from '../material/material.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [UserListComponent, UserComponent],
  imports: [CommonModule, MaterialModule],
  exports: [UserListComponent],
})
export class UserModule {}
