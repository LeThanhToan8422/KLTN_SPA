import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CustomerService } from 'src/modules/customer/customer.service';
import { EmployeeService } from 'src/modules/employee/employee.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private customerService: CustomerService,
    private employeeService: EmployeeService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    // let result;
    // if (user.type === 'customer') {
    //   result = await this.customerService.getByAccountId(user.id);
    // } else {
    //   result = await this.employeeService.getByAccountId(user.id);
    // }
    // console.log(result);
    return requiredRoles.some((role) => user.type?.includes(role));
  }
}
