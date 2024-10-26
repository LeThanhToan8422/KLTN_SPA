import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Appointment from './appointment.entity';
import Bonus from './bonus.entity';

@Entity()
export default class BonusPointHistory {
  @PrimaryColumn()
  appointmentId: number;
  @PrimaryColumn()
  bonusId: number;
  @ManyToOne(() => Appointment, (a) => a.bonusPointHistory)
  @JoinColumn({
    name: 'appointmentId',
  })
  appointment: Appointment;
  @ManyToOne(() => Bonus, (b) => b.bonusPointHistory)
  @JoinColumn({
    name: 'bonusId',
  })
  bonus: Bonus;
}
