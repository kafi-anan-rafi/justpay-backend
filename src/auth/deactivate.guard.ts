import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class DeactivateAuthGuard extends AuthGuard('local') implements CanActivate {
  canDeactivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    request.session.destroy(); // Destroy the session
    return true; // Return true to allow the deactivation
  }
}