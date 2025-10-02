const { querySubgraph, gql } = require('./graphqlclient');
const logger = require('../utils/logger');
const util = require('util');

const fetchAllDomains = async () => {
    try {
  const query = gql`
    query Names($fractionalized: Boolean, $active: Boolean, $skip: Int, $take: Int, $sortOrder: SortOrderType) {
  names(fractionalized: $fractionalized, active: $active, skip: $skip, take: $take, sortOrder: $sortOrder) {
    items {
      name
      tokenizedAt
      tokens {
        createdAt
        ownerAddress
        tokenAddress
        chain {
          name
          addressUrlTemplate
        }
      }
    }
  }
      }
    `;
const response = await querySubgraph(
    query, 
    { fractionalized: true, active: true, skip: 0, take: 1, sortOrder: 'DESC' }
);

console.log("Fetched new domains:", 
    util.inspect(response?.names?.items || [], { depth: null }));
return JSON.stringify(response?.names?.items || []);
} catch (err) {
    logger.error("Error fetching new domains", err);
  }
};

const fetchSpecificDomainName = async (domainName) => {
    try {
  const query = gql`query Name($name: String!) {
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
}`;

const response = await querySubgraph(
    query, 
    { name: domainName }
);

console.log("Fetched specific domain:", 
    util.inspect(response?.name || {}, { depth: null }));
return JSON.stringify(response?.name || {});
} catch (err) {
    logger.error("Error fetching new domains", err);
  }
};

module.exports = {
  fetchAllDomains,
  fetchSpecificDomainName
};

