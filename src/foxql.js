import foxql from "@foxql/foxql-peer";
import * as dbConfig from './database.js';

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

node.start(dbConfig);

window.foxql = node