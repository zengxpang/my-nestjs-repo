import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { DepartmentService } from './department.service';
import { EmployeeService } from './employee.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject()
  private readonly departmentService: DepartmentService;
  @Inject()
  private readonly employeeService: EmployeeService;

  @Get()
  getHello(): string {
    return this.appService.getHello() + 'xxx';
  }

  @Get('create')
  async create() {
    const department = await this.departmentService.create({
      name: '技术部',
    });

    await this.employeeService.create({
      name: '曾小胖',
      phone: '12345678912',
      department: {
        connect: {
          id: department.id,
        },
      },
    });

    return 'success';
  }
}
