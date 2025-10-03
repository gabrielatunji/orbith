import { querySubgraph, gql } from './graphqlclient';
import logger from '../utils/logger';
import util from 'util';

export const fetchLatestDomains = async (): Promise<any> => {
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
    const response: any = await querySubgraph(
      query,
      { fractionalized: true, active: true, skip: 0, take: 10, sortOrder: 'DESC' }
    );

    console.log("Fetched new domains:", util.inspect(response?.names?.items));
    return util.inspect(response?.names?.items);
  } catch (err: any) {
    logger.error("Error fetching new domains", err);
    return util.inspect([]); // Return empty array string on error
  }
};

export const fetchSpecificDomainInfo = async (domainName: string): Promise<any> => {
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

    const response: any = await querySubgraph(
      query,
      { name: domainName }
    );

    console.log("Fetched specific domain:",
    util.inspect(response?.name));
    return util.inspect(response?.name);
  } catch (err: any) {
    logger.error("Error fetching specific domain", err);
    return util.inspect({}); 
  }
};



export const fetchNewListings = async (): Promise<any> => {
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

    const response: any = await querySubgraph(
      query,
      { skip: 0, take: 5, createdSince: "2025-10-01T01:18:30.306Z" }
    );

    console.log("Fetched new listings:",
    util.inspect(response?.listings?.items));
    return util.inspect(response?.listings?.items);
  } catch (err: any) {
    logger.error("Error fetching new listings", err);
    return util.inspect([]); 
  }
};


export const fetchFractionalDomains = async (): Promise<any> => {
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
    const response: any = await querySubgraph(
      query,
      { skip: 0, take: 5, status: "FRACTIONALIZED" }
    );

    console.log("Fetched fractional domains:",
    util.inspect(response?.fractionalTokens?.items));
    return util.inspect(response?.fractionalTokens?.items);
  } catch (err: any) {
    logger.error("Error fetching fractional domains", err);
    return util.inspect([]); 
  }
};


export const fetchDomainTokenPrice = async (domainName: string): Promise<any> => {
  try {
    const query = gql`
      query Name($name: String!) {
        name(name: $name) {
          fractionalTokenInfo {
            currentPrice
          }
        }
      }
    `;
     
    const response: any = await querySubgraph(
      query,
      { name: domainName }
    );

    console.log(`${domainName} current token price:`, util.inspect(response?.name?.fractionalTokenInfo[0]?.currentPrice));
    return util.inspect(response?.name?.fractionalTokenInfo[0]?.currentPrice) || 0;
  } catch (err: any) {
    logger.error("Error fetching domain token price", err);
    return 0; 
  }
};
