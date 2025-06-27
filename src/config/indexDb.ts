import type { FormArray } from "../Types/FormBuilder/Form";

const DB_NAME = 'Form.Io';
const DB_VERSION = 1;
const STORE_NAME = 'forms';
const SUBMISSION_STORE='submissions'

// let Temp_Version:number = 2

let db: IDBDatabase | null = null

export const openDb = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        if (db) {
            resolve(db)
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
            console.log('hello i am upgarde');
            const target = e.target as IDBOpenDBRequest
            const dbInstance = target.result

            if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
                dbInstance.createObjectStore(STORE_NAME, { keyPath: 'formId' })
            }
            if (!dbInstance.objectStoreNames.contains(SUBMISSION_STORE)) {
                dbInstance.createObjectStore(SUBMISSION_STORE, { keyPath: 'formId' })
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

export const addForm = async (data: FormArray): Promise<FormArray> => {
    const dbInstance = await openDb();
    const transaction = dbInstance.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    return new Promise((resolve, reject) => {
        // const key=data.formId as IDBValidKey
        const request = store.add(data)
        request.onsuccess = (event) => {
            const target = event.target as IDBRequest
            resolve(target.result as FormArray)
        }
        request.onerror = (event) => {
            const target = event.target as IDBRequest
            reject(target.error)
        }
    })
}

export const getAllForm = async (): Promise<FormArray[]> => {
    const dbInstance = await openDb();
    const transaction = dbInstance.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    return new Promise((resolve, reject) => {
        const request = store.getAll()
        request.onsuccess = (event) => {
            const target = event.target as IDBRequest
            resolve(target.result as FormArray[])
        }
        request.onerror = (event) => {
            const target = event.target as IDBRequest
            reject(target.error)
        }
    })
}


export const getForm = async (id: number): Promise<FormArray> => {
    const dbInstance = await openDb();
    const transaction = dbInstance.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    return new Promise((resolve, reject) => {
        // const key=id as IDBValidKey

        const request = store.get(id)
        request.onsuccess = (event) => {
            const target = event.target as IDBRequest
            // console.log(target);
            resolve(target.result as FormArray)
        }
        request.onerror = (event) => {
            const target = event.target as IDBRequest
            reject(target.error)
        }
    })
}


export const addSubmission = async (data: any): Promise<any> => {
    const dbInstance = await openDb();
    const transaction = dbInstance.transaction(SUBMISSION_STORE, 'readwrite');
    const store = transaction.objectStore(SUBMISSION_STORE);
    return new Promise((resolve, reject) => {
        // const key=data.formId as IDBValidKey
        const request = store.put(data)
        request.onsuccess = (event) => {
            const target = event.target as IDBRequest
            resolve(target.result)
        }
        request.onerror = (event) => {
            const target = event.target as IDBRequest
            reject(target.error)
        }
    })
}

// export const getAllSubmission = async (): Promise<[]> => {
//     const dbInstance = await openDb();
//     const transaction = dbInstance.transaction(SUBMISSION_STORE, 'readwrite');
//     const store = transaction.objectStore(SUBMISSION_STORE);
//     return new Promise((resolve, reject) => {
//         const request = store.getAll()
//         request.onsuccess = (event) => {
//             const target = event.target as IDBRequest
//             resolve(target.result as [])
//         }
//         request.onerror = (event) => {
//             const target = event.target as IDBRequest
//             reject(target.error)
//         }
//     })
// }

export const getSubmission = async (id: number): Promise<any> => {
    const dbInstance = await openDb();
    const transaction = dbInstance.transaction(SUBMISSION_STORE, 'readwrite');
    const store = transaction.objectStore(SUBMISSION_STORE);
    return new Promise((resolve, reject) => {
        // const key=id as IDBValidKey

        const request = store.get(id)
        request.onsuccess = (event) => {
            const target = event.target as IDBRequest
            // console.log(target);
            resolve(target.result)
        }
        request.onerror = (event) => {
            const target = event.target as IDBRequest
            reject(target.error)
        }
    })
}



// export const customOpenDb = (storeId:string): Promise<IDBDatabase> => {
//     return new Promise((resolve, reject) => {
//         console.log('in custom db');
//         console.log(Temp_Version);
//         const request = indexedDB.open(DB_NAME,Temp_Version);
//         console.log(storeId);
//         console.log(request);
//         Temp_Version=Temp_Version+1;
//         request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
//             const target = e.target as IDBOpenDBRequest
//             const dbInstance = target.result
//             console.log('bbfhbh');
//             if (!dbInstance.objectStoreNames.contains(storeId)) {
//                 dbInstance.createObjectStore(storeId, { keyPath: 'submissionId' })
//             }

//         }

//         request.onsuccess = (event) => {
//             console.log('on success');
//             const target = event.target as IDBOpenDBRequest;
//             resolve(target.result)
//         }
//         request.onerror = (event: Event) => {
//             const target = event.target as IDBOpenDBRequest;
//             reject(target.error);
//         };
//     })
// }


// export const addSubmission = async (storeId: string, data:any) => {
//     console.log('in add submisiion');
    
//      const dbInstance = await customOpenDb(storeId);
//      console.log(dbInstance);
//     const transaction = dbInstance.transaction(storeId, 'readwrite');
//     const store = transaction.objectStore(storeId);
//     return new Promise((resolve, reject) => {
//         // const key=data.formId as IDBValidKey
//         const request = store.add(data)
//         request.onsuccess = (event) => {
//             const target = event.target as IDBRequest
//             resolve(target.result)
//         }
//         request.onerror = (event) => {
//             const target = event.target as IDBRequest
//             reject(target.error)
//         }
//     })
// }