import { Module } from '@nestjs/common';
import { IMProductQuery } from '../product/infrastructures/inmemory/im-product.query';
import { IMStockQuery } from './infrastructures/inmemory/im-stock.query';
import { StockResolver } from './presentations/stock.resolver';
import {
  PRODUCT_QUERY_INJECT_KEY,
  STOCK_QUERY_INJECT_KEY,
} from './stock.constant';

@Module({
  imports: [],
  controllers: [],
  providers: [
    StockResolver,
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
export class StockModule {}
