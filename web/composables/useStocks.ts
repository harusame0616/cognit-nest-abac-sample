import { gql } from '@apollo/client/core';

const allStocksQuery = gql`
  query StockListQuery {
    stocks {
      id
      product {
        id
        name
        description
      }
      quantity
    }
  }
`;

type Stock = {
  id: string;
  product: { id: string; name: string; description: string };
  quantity: number;
};

const useStocks = () => {
  const { $api } = useNuxtApp();

  const {
    data: list,
    pending,
    refresh,
  } = useLazyAsyncData('useStocks', async () =>
    $api.query<Stock[]>({ query: allStocksQuery })
  );

  return {
    list,
    pending,
    refresh,
  };
};

export default useStocks;
