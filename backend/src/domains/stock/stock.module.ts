import { Module } from '@nestjs/common';
import { IMStockQuery } from './infrastructures/inmemory/im-stock.query';
import { StockResolver } from './presentations/stock.resolver';
import {
  STOCK_QUERY_INJECT_KEY,
  PRODUCT_QUERY_INJECT_KEY,
} from './stock.constant';
import { IMProductQuery } from '../product/infrastructures/inmemory/im-product.query';

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
