import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as Schema from '@ResolverSchema';
import {
  ProductQuery,
  ProductQueryUsecase,
} from 'src/domains/product/usecases/product-query-usecase';
import {
  StockQuery,
  StockQueryUsecase,
} from 'src/domains/stock/usecases/stock-query-usecase';
import {
  PRODUCT_QUERY_INJECT_KEY,
  STOCK_QUERY_INJECT_KEY,
} from '../product.constant';

@Resolver('Product')
export class ProductResolver {
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
  async product(
    @Args('id') id: string,
  ): Promise<Omit<Schema.Query['stock'], 'product'>> {
    return await this.stockQueryUsecase.findOneById(id);
  }

  @Query()
  async products(): Promise<Omit<Schema.Query['stock'], 'product'>[]> {
    return await this.stockQueryUsecase.list();
  }

  @ResolveField()
  async stock(
    @Parent() { id }: Schema.Product,
  ): Promise<Omit<Schema.Query['stock'], 'product'>> {
    const stock = await this.stockQueryUsecase.findOneByProductId(id);

    if (!stock) {
      throw new Error('product is not found');
    }

    return stock;
  }
}
