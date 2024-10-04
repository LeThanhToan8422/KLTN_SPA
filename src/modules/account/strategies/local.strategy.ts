import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AccountService } from '../account.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly accountService: AccountService) {
    super({
      usernameField: 'phone',
      passwordField: 'password',
    });
  }

  async validate(phone: string, password: string) {
    console.log(phone, password);
    return await this.accountService.login(phone, password);
  }
}
