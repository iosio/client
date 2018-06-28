
import {updateItemInObjArrById, removeItemFromObjArrById, findByIdInObjArr} from "@iosio/utils/lib/crud_operations";

const delay = (cb, del)=>{
    setTimeout(()=>{
        cb && cb();
    }, del ? del : 300)
};

const delayPromise = (data, del)=>{
    return new Promise((resolve, reject)=>{
        let stringified = JSON.stringify(data, null, 4);
        delay(()=>resolve({data, stringified}), del);
    })
};


export class FakeClient {
    constructor(api_url, data) {
        this.api_url = api_url;
        this.fake_options = fake_options;
        this.data = data ? data: {};
    }

    get = (data_key, del)=>{
        return delayPromise(this.data[data_key], del);
    };

    post = (data_key, item, del) => {
        this.data[data_key].push(item);
        return delayPromise(this.data[data_key], del);
    };


    updateByItemById = (data_key, item, del)=>{
        console.log('item to be updated on list', item);
        this.data[data_key] = updateItemInObjArrById(this.data[data_key], 'id', item.id, item);
        return delayPromise(this.data[data_key], del);
    };

    deleteItemById = (data_key, item_id, del) => {
        this.data[data_key] = removeItemFromObjArrById(this.data[data_key],'id',item_id);
        return delayPromise(this.data[data_key], del);
    };

    getItemById = (data_key, item_id, del) =>{
        let item = findByIdInObjArr(this.data[data_key],'id', item_id);
        return delayPromise(item, del);
    };

    requestAccess = (should_not_login = true, del)=>{

        const user = should_not_login ? {granted:false} :  {user: 'Joe Dirt', granted: true} ;

        return delayPromise(user, del);
    }

}



export class Client {
    constructor(api_url) {
        this.api_url = api_url;
    }

    get = (params) => fetch(`${this.api_url}${params ? params : ''}`)
        .then((response) => this.handleError(response))
        .then((response) => response.json());

    handleError = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    };

    post = (url, data) => fetch(`${this.api_url}${url ? url : ''}`,
        {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then((response) => {
            console.log(response)
            return this.handleError(response)
        })
        .then((response) => response.json());
}