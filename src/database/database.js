export const version = 1

export function onerror(e)
{
    console.error("An error occurred with IndexedDB")
    console.error(e)
}

export function onupgradeneeded(){
    //1
    const db = this.request.result;
    //2
    const store = db.createObjectStore("documents", { keyPath: "id" })
  
    //3
    store.createIndex("content", ["content"])
    store.createIndex('documentKey', ["documentKey"], { unique: true })
}