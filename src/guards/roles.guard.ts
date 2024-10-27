import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import EmployeeDto from 'src/modules/employee/dtos/employee.dto';
import { EmployeeService } from 'src/modules/employee/employee.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
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
    const response = await this.employeeService.getByAccountId(user.id);
    const employeeDto = plainToInstance(EmployeeDto, response.data);
    return requiredRoles.some((role) => employeeDto.role?.includes(role));
  }
}
