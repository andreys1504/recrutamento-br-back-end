import { ApiProperty } from '@nestjs/swagger';

export class AutenticarRequestApi {
  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;
}
