import { Client } from "@elastic/elasticsearch";

const client = new Client({ 
  node: "http://localhost:9200"
});

async function connectToElasticsearch() {
  try {
    await client.ping();
    console.log("Connected to Elasticsearch");
  } catch (error) {
    console.error("Failed to connect to Elasticsearch", error);
    throw error;
  }
}

async function addDataToElasticsearch(data) {
  try {
    await client.index({
      index: "myindex",
      document: data
    });
    console.log("Data added to Elasticsearch");
  } catch (error) {
    console.error("Failed to add data to Elasticsearch", error);
    throw error;
  }
}

export { connectToElasticsearch, addDataToElasticsearch };