import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: (string | ((...args: any[]) => any))[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
