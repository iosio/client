
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

// export const client = new Client('https://jsonplaceholder.typicode.com/');
