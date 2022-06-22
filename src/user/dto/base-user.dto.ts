export class BaseUserDto {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  pnl?: PNL;
}

class PNL {
  readonly amount: number;
}
