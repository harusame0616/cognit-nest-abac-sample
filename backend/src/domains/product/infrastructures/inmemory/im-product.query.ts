import { products } from './product-store';
import { ProductQuery } from 'src/domains/product/usecases/product-query-usecase';

export class IMProductQuery implements ProductQuery {
  async findOneById(id: string) {
    const product = products.find((product) => product.id === id);
    return product ? { ...product } : null;
  }

  async findOneByStockId(stockId: string) {
    const product = products.find((product) => product.stockId === stockId);
    return product ? { ...product } : null;
  }

  async list() {
    return [...products];
  }
}
