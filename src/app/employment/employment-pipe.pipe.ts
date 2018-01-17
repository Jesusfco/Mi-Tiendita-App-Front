import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employmentPipe'
})
export class EmploymentPipePipe implements PipeTransform {

  transform(users: any, search: any): any {
    if(search === undefined) return users;

    return users.filter(function(user){

      return (user.name.includes(search.toUpperCase()) || user.email.includes(search.toUpperCase()) || user.phone.includes(search));
    });
  }

}
