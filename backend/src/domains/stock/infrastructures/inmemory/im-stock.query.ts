import { StockQuery } from '../../usecases/stock-query-usecase';
import { stocks } from './stock-store';

export class IMStockQuery implements StockQuery {
  findOneById(id: string) {
    const stock = stocks.find((stock) => stock.id === id);
    return stock ? { ...stock } : null;
  }

  findOneByProductId(
    productId: string,
  ): { id: string; quantity: number } | null {
    const stock = stocks.find((stock) => stock.productId === productId);
    return stock ? { ...stock } : null;
  }

  list() {
    return [...stocks];
  }
}
