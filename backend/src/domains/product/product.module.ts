import { Module } from '@nestjs/common';
import { IMStockQuery } from '../stock/infrastructures/inmemory/im-stock.query';
import { IMProductQuery } from './infrastructures/inmemory/im-product.query';
import { ProductResolver } from './presentations/product.resolver';
import {
  PRODUCT_QUERY_INJECT_KEY,
  STOCK_QUERY_INJECT_KEY,
} from './product.constant';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ProductResolver,
    {
      provide: STOCK_QUERY_INJECT_KEY,
      useClass: IMStockQuery,
    },
    {
      provide: PRODUCT_QUERY_INJECT_KEY,
      useClass: IMProductQuery,
    },
  ],
})
export class ProductModule {}
