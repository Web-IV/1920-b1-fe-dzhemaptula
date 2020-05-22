import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from '../material/material.module';
import { UserComponent } from './user/user.component';
import { UserFilterPipe } from '../_filters/user-filter.pipe';

@NgModule({
  declarations: [UserListComponent, UserComponent, UserFilterPipe],
  imports: [CommonModule, MaterialModule],
  exports: [UserListComponent],
})
export class UserModule {}
