import { Model, model } from "mongoose";
import { Entities } from "src/data/data-source/mongoose/entities";
import { EntityToDocument } from "src/data/data-source/mongoose/entity-to-document";
import { Usuario } from "src/domain/conta-usuario/entities/usuario";
import { usuarioSchema } from "src/data/data-source/mongoose/schemas/conta-usuario/usuario.schema";
import { Injectable } from "@nestjs/common";

interface Usuario_Document extends EntityToDocument<Usuario> {
}

@Injectable()
export class UsuarioRepository {
    get model(): Model<Usuario_Document> {
        return model<Usuario_Document>(Entities.Usuario, usuarioSchema);;
    }
}
