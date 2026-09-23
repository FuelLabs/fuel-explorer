import { gql } from 'graphql-request';

export const LATEST_HEIGHT_QUERY = gql`
  query latestHeight {
    blocks(last: 1) {
      nodes {
        header {
          height
        }
      }
    }
  }
`;
