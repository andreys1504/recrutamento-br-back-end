import { SetMetadata } from '@nestjs/common';
import { RolesApi } from '../../../core/authorizations/roles-api';

export const ALLOW_ANONYMOUS_KEY = 'allowAnonymous';
export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS_KEY, true);


export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesApi[]) => SetMetadata(ROLES_KEY, roles);
