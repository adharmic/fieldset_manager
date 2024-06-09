import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: process.env.ELASTICSEARCH_URI || 'http://localhost:9200' });

async function connectToElasticsearch() {
  try {
    await client.ping();
    console.log("Connected to Elasticsearch");
  } catch (err) {
    console.error("Failed to connect to Elasticsearch", err);
    throw err;
  }
}

export {connectToElasticsearch, client };