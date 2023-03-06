import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StockModule } from 'src/domains/stock/stock.module';
import { ProductModule } from './domains/product/product.module';

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
  providers: [],
})
export class AppModule {}
