import { ApiProperty } from "@nestjs/swagger";

export class CadastrarUsuarioCandidatoRequestApi {
  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;

  @ApiProperty()
  nome: string;
}
