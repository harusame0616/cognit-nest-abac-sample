import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StockModule } from 'src/domains/stock/stock.module';
import { ProductModule } from './domains/product/product.module';
import { AuthenticationGuard } from './guards/authentication/authentication-guard';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
    StockModule,
    ProductModule,
  ],
  controllers: [],
  providers: [AuthenticationGuard],
})
export class AppModule {}
