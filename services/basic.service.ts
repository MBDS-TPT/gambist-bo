import Config from '../config/config.json';

export const getBaseUrl = () => process.env.BASE_URL || Config.BASE_URL;

export default abstract class BasicService {

    static async fetchData(uri: string, params: any=null)  {
        try {
            let paramsString = "";
            if(params) {
                const keys = Object.keys(params)
                const searchParams = new URLSearchParams();
                for(const key of keys)
                    searchParams.append(key, params[key])
                    paramsString = searchParams.toString();
            }
            console.log("BO$>", getBaseUrl() + uri + (params ? "?" + paramsString : ""))
            const res = await fetch(getBaseUrl() + uri + (params ? "?" + paramsString : ""))
            return await res.json()
        } catch(error) {
            console.error("error >", error)
        }
    }

    static async postData(uri: string, params: any, method='POST') {
        console.log("BO$>", getBaseUrl() + uri, {
            method: method,
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const response = await fetch(getBaseUrl() + uri, {
            method: method,
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        
        return response.json();
        // .then(response => response.json())
        // .then(json => console.log(json));
    }
}