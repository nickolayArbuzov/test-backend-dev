import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JWT } from '../jwt';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(
    private jwtService: JWT,
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request: Request = context.switchToHttp().getRequest();  
    if (request.cookies){
      try {
        const user = this.jwtService.verify(request.cookies.refreshToken)
        if (user){
          return true
        }
      } catch (e){
        throw new UnauthorizedException()
      }
    }
    throw new UnauthorizedException()
  }
}