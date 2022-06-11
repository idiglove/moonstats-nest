import { Module } from '@nestjs/common';
import { UserPnlService } from './user-pnl.service';

@Module({
  providers: [UserPnlService],
  exports: [UserPnlService],
})
export class UserPnlModule {}
