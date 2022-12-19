export const version = 1

export function onerror(e)
{
    console.error("An error occurred with IndexedDB")
    console.error(e)
}

export function onupgradeneeded(){
    const db = this.request.result;
    const store = db.createObjectStore("documents", { keyPath: "id" })
  
    store.createIndex("url", ["url"])
    store.createIndex("content", ["content"])
    store.createIndex("platform", ["platform"])
    store.createIndex("documentKey", ["documentKey"], { unique: true })

    console.log('Database init')
}

