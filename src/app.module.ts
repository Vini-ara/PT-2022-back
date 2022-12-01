import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, QuestionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
