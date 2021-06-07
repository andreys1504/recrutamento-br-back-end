import { ApiProperty } from "@nestjs/swagger";

export class EditarVagaRequestApi {
    @ApiProperty()
    idVaga: string;

    @ApiProperty()
    tituloVaga: string;

    @ApiProperty()
    descricao: string;

    @ApiProperty()
    tags: string[];
}
