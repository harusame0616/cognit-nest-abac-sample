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
    error,
    refresh,
  } = useAsyncData(
    'useStocks',
    async () =>
      (await $api.query<{ stocks: Stock[] }>({ query: allStocksQuery })).data
        .stocks
  );

  return {
    list: list,
    pending,
    error,
    refresh,
  };
};

export default useStocks;
