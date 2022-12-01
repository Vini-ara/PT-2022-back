import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EnsureAdminGuard extends AuthGuard('ensureAdmin') {}
