import { StockQuery } from '../../usecases/stock-query-usecase';
import { stocks } from './stock-store';

export class IMStockQuery implements StockQuery {
  async findOneById(id: string) {
    const stock = stocks.find((stock) => stock.id === id);
    return stock ? { ...stock } : null;
  }

  async findOneByProductId(productId: string) {
    const stock = stocks.find((stock) => stock.productId === productId);
    return stock ? { ...stock } : null;
  }

  async list() {
    return [...stocks];
  }
}
