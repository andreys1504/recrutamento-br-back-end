import { ApiProperty } from "@nestjs/swagger";

export class CadastrarUsuarioRecrutadorRequestApi {
  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;

  @ApiProperty()
  nome: string;
}
