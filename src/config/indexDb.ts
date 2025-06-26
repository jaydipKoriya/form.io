import type { FormArray } from "../Types/FormBuilder/Form";

const DB_NAME = 'Form.Io';
const DB_VERSION = 1;
const STORE_NAME = 'forms';


let db: IDBDatabase | null = null

export const openDb = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db)
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
            const target = e.target as IDBOpenDBRequest
            const dbInstance = target.result

            if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
                dbInstance.createObjectStore(STORE_NAME,{keyPath : 'formId'})
            }

        }

        request.onsuccess = (event) => {
            const target = event.target as IDBOpenDBRequest;
            db = target.result;
            resolve(db)
        }
        request.onerror = (event: Event) => {
            const target = event.target as IDBOpenDBRequest;
            reject(target.error);
        };
    })
}

export const addForm=async(data:FormArray):Promise<FormArray>=>{
    const dbInstance=await openDb();
    const transaction=dbInstance.transaction(STORE_NAME,'readwrite');
    const store=transaction.objectStore(STORE_NAME);
    return new Promise((resolve,reject)=>{
        // const key=data.formId as IDBValidKey
        const request=store.add(data)
        request.onsuccess=(event)=>{
            const target=event.target as IDBRequest
            resolve(target.result as FormArray)
        }
        request.onerror=(event)=>{
            const target=event.target as IDBRequest
            reject(target.error)
        }
    })
}

export const getAllForm=async():Promise<FormArray[]>=>{
    const dbInstance=await openDb();
    const transaction=dbInstance.transaction(STORE_NAME,'readwrite');
    const store=transaction.objectStore(STORE_NAME);
    return new Promise((resolve,reject)=>{
        const request=store.getAll()
        request.onsuccess=(event)=>{
            const target=event.target as IDBRequest
            resolve(target.result as FormArray[])
        }
        request.onerror=(event)=>{
            const target=event.target as IDBRequest
            reject(target.error)
        }
    })
}

export const getForm=async(id:number):Promise<FormArray>=>{
    const dbInstance=await openDb();
    const transaction=dbInstance.transaction(STORE_NAME,'readwrite');
    const store=transaction.objectStore(STORE_NAME);
    return new Promise((resolve,reject)=>{
        // const key=id as IDBValidKey

        const request=store.get(id)
        request.onsuccess=(event)=>{
            const target=event.target as IDBRequest
            // console.log(target);
            resolve(target.result as FormArray)
        }
        request.onerror=(event)=>{
            const target=event.target as IDBRequest
            reject(target.error)
        }
    })
}


