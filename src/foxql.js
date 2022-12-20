import foxql from "@foxql/foxql-peer";
import * as dbConfig from './database.js';
import sha256 from 'crypto-js/sha256';
import nodeEvents from './events.js';

const node = new foxql({
  maxNodeCount: 80, // max connection limit
  maxCandidateCallTime: 3000, // how long to wait for a response from a candidate node
  powPoolingTime: 2000,
  dappAlias: 'd2a-network'
});

node.setMetaData({
  name: "Fikri",
  description: "test-desc",
});

node.loadEvents(nodeEvents)

node.start(dbConfig);

async function save(document)
{
  const hash = sha256(document.url + document.content).toString();
  document.documentKey = hash
  const {indexedDb} = node
  const objectStore = indexedDb.transaction('documents', 'readwrite').objectStore('documents')
  return objectStore.add(document)
}

window.saveDocument = save
window.foxql = node

