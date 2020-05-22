import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../_models/user';

@Pipe({
  name: 'userFilter',
})
export class UserFilterPipe implements PipeTransform {
  transform(users: User[], name: string): User[] {
    if (!name || name.length == 0 || name.trim().length == 0) {
      return users;
    }
    return users.filter(
      (user) =>
        user.username.toLowerCase().startsWith(name.toLowerCase()) ||
        user.firstName.toLowerCase().startsWith(name.toLowerCase()) ||
        user.lastName.toLowerCase().startsWith(name.toLowerCase())
    );
  }
}
