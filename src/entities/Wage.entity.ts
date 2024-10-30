import { RoleEmployee } from 'src/enums/role-employee.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Employee from './employee.entity';

@Entity()
export default class Wage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  hourlyRate: number;
  @Column({
    type: 'date',
  })
  effectiveDate: Date;
  @Column({ type: 'enum', enum: ['admin', 'manager', 'employee'] })
  role: RoleEmployee;
  @OneToMany(() => Employee, (e) => e.wage)
  employees: Employee[];
}
