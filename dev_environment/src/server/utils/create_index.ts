import { OpenSearchClient } from 'opensearch-dashboards/server';
import { TODO_INDEX } from '../constants';

/**
 * The function `createIndexIfNotExists` checks if a specified index exists in an OpenSearch client and creates it if it
 * does not.
 */
export async function createIndexIfNotExists(openSearchClient: OpenSearchClient) {
  if (!(await openSearchClient.indices.exists({ index: TODO_INDEX }))) {
    await openSearchClient.indices.create({ index: TODO_INDEX });
  }
}
