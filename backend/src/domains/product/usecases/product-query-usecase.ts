type ProductQueryResponse = {
  id: string;
  name: string;
  description: string;
};

export type ProductQuery = {
  findOneById(id: string): Promise<ProductQueryResponse | null>;
  findOneByStockId(stockId: string): Promise<ProductQueryResponse | null>;
  list(): Promise<ProductQueryResponse[]>;
};

export class ProductQueryUsecase {
  constructor(private productQuery: ProductQuery) {}

  async findOneById(id: string) {
    return await this.productQuery.findOneById(id);
  }

  async findOneByStockId(stockId: string) {
    return await this.productQuery.findOneByStockId(stockId);
  }

  async list() {
    return await this.productQuery.list();
  }
}
