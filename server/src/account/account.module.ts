import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.type';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Account])
  ],
  providers: [
    AccountService,
    AccountResolver
  ]
})
export class AccountModule {}
