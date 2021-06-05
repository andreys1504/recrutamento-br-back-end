import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { TokenPayload } from './token.payload';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createTokenAsync(
    idUsuario: string,
    idCandidatoRecrutador: string,
    email: string,
    permissoes: string[],
  ): Promise<string> {
    const payload: TokenPayload = {
      idUsuario: idUsuario,
      idCandidatoRecrutador: idCandidatoRecrutador,
      email: email,
      permissoes: permissoes,
    };
    return await this.jwtService.signAsync(payload);
  }
}
