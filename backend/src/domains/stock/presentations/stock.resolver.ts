import { Inject, UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as Schema from '@ResolverSchema';
import {
  ProductQuery,
  ProductQueryUsecase,
} from 'src/domains/product/usecases/product-query-usecase';
import { AuthenticationGuard } from 'src/guards/authentication/authentication-guard';
import {
  PRODUCT_QUERY_INJECT_KEY,
  STOCK_QUERY_INJECT_KEY,
} from '../stock.constant';

import { StockQuery, StockQueryUsecase } from '../usecases/stock-query-usecase';

@Resolver('Stock')
@UseGuards(AuthenticationGuard)
export class StockResolver {
  stockQueryUsecase: StockQueryUsecase;
  productQueryUsecase: ProductQueryUsecase;

  constructor(
    @Inject(STOCK_QUERY_INJECT_KEY) stockQuery: StockQuery,
    @Inject(PRODUCT_QUERY_INJECT_KEY) productQuery: ProductQuery,
  ) {
    this.stockQueryUsecase = new StockQueryUsecase(stockQuery);
    this.productQueryUsecase = new ProductQueryUsecase(productQuery);
  }

  @Query()
  stock(
    @Args('id') id: string,
  ): Promise<Omit<Schema.Query['stock'], 'product'>> {
    return this.stockQueryUsecase.findOneById(id);
  }

  @Query()
  stocks(): Promise<Omit<Schema.Query['stock'], 'product'>[]> {
    return this.stockQueryUsecase.list();
  }

  @ResolveField()
  async product(
    @Parent() { id }: Schema.Stock,
  ): Promise<Omit<Schema.Query['product'], 'stock'>> {
    const product = await this.productQueryUsecase.findOneByStockId(id);

    if (!product) {
      throw new Error('product is not found');
    }

    return product;
  }
}
