import { querySubgraph, gql } from './graphqlclient';
import logger from '../utils/logger';

interface Name {
  claimedBy: string;
  name: string;
  registrar: {
    name: string;
  };
  tokenizedAt: string;
}

interface NamesResponse {
  names: {
    items: Name[];
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface SpecificNameResponse {
  name: {
    claimedBy: string;
    nameservers: { ldhName: string }[];
    name: string;
    tokenizedAt: string;
    registrar: { name: string };
    fractionalTokenInfo: {
      address: string;
      buyoutPrice: string;
      chain: { name: string };
      fractionalizedAt: string;
      currentPrice: string;
      fractionalizedBy: string;
      poolAddress: string;
      launchpadAddress: string;
    };
    isFractionalized: boolean;
    tokens: any[]; // Define a more specific type if needed
  };
}

interface Listing {
  chain: {
    name: string;
  };
  name: string;
  price: string;
  tokenAddress: string;
  imageURI: string;
  id: string;
  currency: {
    name: string;
    symbol: string;
    usdExchangeRate: string;
  };
  createdAt: string;
  orderbook: string;
}

interface ListingsResponse {
  listings: {
    items: Listing[];
  };
}

interface FractionalToken {
  chain: {
    name: string;
  };
  currentPrice: string;
  metadata: {
    primaryWebsite: string;
    description: string;
  };
  params: {
    symbol: string;
  };
  status: string;
  address: string;
  name: string;
}

interface FractionalTokensResponse {
  fractionalTokens: {
    items: FractionalToken[];
  };
}

export const fetchLatestDomains = async (): Promise<string> => {
  try {
    const query = gql`
      query Names($skip: Int, $take: Int, $sortOrder: SortOrderType, $active: Boolean) {
        names(skip: $skip, take: $take, sortOrder: $sortOrder, active: $active) {
          items {
            claimedBy
            name
            registrar {
              name
            }
            tokenizedAt
          }
          currentPage
          hasNextPage
          hasPreviousPage
        }
      }
    `;
    const response: NamesResponse = await querySubgraph(
      query,
      { fractionalized: true, active: true, skip: 0, take: 10, sortOrder: 'DESC' }
    );

    console.log("Fetched new domains:", JSON.stringify(response?.names?.items || []));
    return JSON.stringify(response?.names?.items || []);
  } catch (err: any) {
    logger.error("Error fetching new domains", err);
    return JSON.stringify([]); // Return empty array string on error
  }
};

export const fetchSpecificDomainName = async (domainName: string): Promise<string> => {
  try {
    const query = gql`
      query Name($name: String!) {
        name(name: $name) {
          claimedBy
          nameservers {
            ldhName
          }
          name
          tokenizedAt
          registrar {
            name
          }
          fractionalTokenInfo {
            address
            buyoutPrice
            chain {
              name
            }
            fractionalizedAt
            currentPrice
            fractionalizedBy
            poolAddress
            launchpadAddress
          }
          isFractionalized
          tokens {
            chain {
              name
            }
            openseaCollectionSlug
            ownerAddress
            tokenAddress
            startsAt
            createdAt
            listings {
              orderbook
              price
            }
          }
        }
      }
    `;

    const response: SpecificNameResponse = await querySubgraph(
      query,
      { name: domainName }
    );

    console.log("Fetched specific domain:",
    JSON.stringify(response?.name || {}));
    return JSON.stringify(response?.name || {});
  } catch (err: any) {
    logger.error("Error fetching specific domain", err);
    return JSON.stringify({}); // Return empty object string on error
  }
};



export const fetchNewListings = async (): Promise<string> => {
  try {
    const query = gql`
      query Listings($skip: Int, $take: Int, $createdSince: DateTime) {
        listings(skip: $skip, take: $take, createdSince: $createdSince) {
          items {
            chain {
              name
            }
            name
            price
            tokenAddress
            imageURI
            id
            currency {
              name
              symbol
              usdExchangeRate
            }
            createdAt
            orderbook
          }
        }
      }
    `;

    const response: ListingsResponse = await querySubgraph(
      query,
      { skip: 0, take: 5, createdSince: "2025-10-01T01:18:30.306Z" }
    );

    console.log("Fetched new listings:",
    JSON.stringify(response?.listings?.items || []));
    return JSON.stringify(response?.listings?.items || []);
  } catch (err: any) {
    logger.error("Error fetching new listings", err);
    return JSON.stringify([]); // Return empty array string on error
  }
};


export const fetchFractionalDomains = async (): Promise<string> => {
  try {
    const query = gql`
      query FractionalTokens($skip: Int, $take: Int, $status: FractionalTokenStatus) {
        fractionalTokens(skip: $skip, take: $take, status: $status) {
          items {
            chain {
              name
            }
            currentPrice
            metadata {
              primaryWebsite
              description
            }
            params {
              symbol
            }
            status
            address
            name
          }
        }
      }
    `;
    const response: FractionalTokensResponse = await querySubgraph(
      query,
      { skip: 0, take: 5, status: "FRACTIONALIZED" }
    );

    console.log("Fetched fractional domains:",
    JSON.stringify(response?.fractionalTokens?.items || []));
    return JSON.stringify(response?.fractionalTokens?.items || []);
  } catch (err: any) {
    logger.error("Error fetching fractional domains", err);
    return JSON.stringify([]); // Return empty array string on error
  }
};

