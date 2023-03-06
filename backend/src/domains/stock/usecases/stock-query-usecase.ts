type StockQueryResponse = {
  id: string;
  quantity: number;
};

type StockListQueryResponse = StockQueryResponse[];

export type StockQuery = {
  findOneById(id: string): Promise<StockQueryResponse | null>;
  findOneByProductId(productId: string): Promise<StockQueryResponse | null>;
  list(): Promise<StockListQueryResponse>;
};

export class StockQueryUsecase {
  constructor(private stockQuery: StockQuery) {}

  async findOneById(id: string) {
    const stock = await this.stockQuery.findOneById(id);

    if (!stock) {
      throw new Error('stock is not found');
    }

    return stock;
  }

  async findOneByProductId(id: string) {
    const stock = await this.stockQuery.findOneByProductId(id);

    if (!stock) {
      throw new Error('stock is not found');
    }

    return stock;
  }

  async list() {
    return await this.stockQuery.list();
  }
}
