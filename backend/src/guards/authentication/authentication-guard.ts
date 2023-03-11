import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const token = req.headers.authorization.split(' ')[1];

    const verifier = CognitoJwtVerifier.create({
      tokenUse: 'id',
      userPoolId: 'ap-northeast-1_losjmWWev',
      clientId: '76bl8nf0j6a34ck5jmbnn3gqim',
    });

    try {
      const payload = await verifier.verify(token);
      req.user = payload;
      return true;
    } catch (e) {
      return false;
    }
  }
}
