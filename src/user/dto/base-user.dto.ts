export class BaseUserDto {
  firstName: string;
  lastName?: string;
  email: string;
  pnl?: PNL;
}

class PNL {
  readonly amount: number;
}
