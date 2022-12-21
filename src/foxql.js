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

chrome.storage.local.get("name", function(data) {
  node.setMetaData({
    name: data.name || 'no name'
  });
})



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

/**
 * 
 * @param {string} documentKey 
 */
async function checkDocumentInLocal(documentKey)
{
  const {indexedDb} = node
  return new Promise((resolve) => {
    const objectStore = indexedDb.transaction('documents', 'readwrite').objectStore('documents')
    const req = objectStore.get(documentKey)
    req.onsuccess = (e=> {
      resolve(e.target.result == undefined ? false : true)
    })
  })
}

/**
 * 
 * @param {string} documentKey 
 */
async function deleteDocumentInLocal(documentKey)
{
  const {indexedDb} = node
  return new Promise((resolve) => {
    const transaction = indexedDb.transaction('documents', 'readwrite').objectStore('documents')
    const del = transaction.delete(documentKey)
    del.onsuccess = (()=>{
      resolve(true)
    })
  })
}

/**
 * 
 * @param {string} url 
 * @returns 
 */
async function findDocumentInLocal(url)
{
    const {indexedDb} = node
    const store = indexedDb.transaction('documents', 'readonly').objectStore('documents')
    const cursorRequest = store.openCursor();
    
    let foundedDocuments = []
    
    return new Promise((resolve) => {
        cursorRequest.onsuccess = (e)=> {
            const cursor = e.target.result;
            if(cursor) {
                const document = cursor.value
                if(document.url == url){
                    foundedDocuments.push(document)
                }
                cursor.continue()
            }else{
                resolve(foundedDocuments)
            }
            
        }    
    }) 
}

window.saveDocument = save
window.checkDocumentInDb = checkDocumentInLocal
window.deleteInDb = deleteDocumentInLocal
window.findDocumentInDb = findDocumentInLocal
window.foxql = node

