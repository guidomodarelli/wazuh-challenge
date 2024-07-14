import { OpenSearchClient } from 'opensearch-dashboards/server';
import { TODO_INDEX } from '../constants';

export async function createIndexIfNotExists(openSearchClient: OpenSearchClient) {
  if (!(await openSearchClient.indices.exists({ index: TODO_INDEX }))) {
    await openSearchClient.indices.create({ index: TODO_INDEX });
  }
}
