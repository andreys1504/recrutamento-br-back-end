import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { RolesApi } from '../../../core/authorizations/roles-api';
import { ALLOW_ANONYMOUS_KEY, ROLES_KEY } from './roles.decorator';
import { TokenPayload } from './token.payload';

@Injectable()
export class AppAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isAnonymousAllowed = this.reflector.getAllAndOverride<boolean>(
      ALLOW_ANONYMOUS_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (isAnonymousAllowed) {
      return true;
    }

    if (await super.canActivate(context) === false) {
      return false;
    }

    const requiredRoles: RolesApi[] = this.reflector.getAllAndOverride<RolesApi[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const payload: TokenPayload = context.switchToHttp().getRequest().user;
    return requiredRoles.some((role) => payload.permissoes?.includes(role));
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
