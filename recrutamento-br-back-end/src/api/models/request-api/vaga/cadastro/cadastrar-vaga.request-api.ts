import { ApiProperty } from "@nestjs/swagger";

export class CadastrarVagaRequestApi {
    @ApiProperty()
    tituloVaga: string;

    @ApiProperty()
    descricao: string;

    @ApiProperty()
    tags: string[];
}
