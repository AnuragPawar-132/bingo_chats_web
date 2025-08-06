const get = async (api: string, headers: any) => {
    try {
        let response = await fetch(api, {
            headers,
            method: "GET"
        })
        if (!response.ok) {
            console.log("HTTP Error:", response.status);
            return;
        }
        let result = await response.json();
        return result;
    } catch (err) {
        console.log(err)
    }
}


const post = async (api: string, headers: any, body: any) => {
    try {
        let response = await fetch(api, {
            headers,
            method: "POST",
            body
        })
        if (!response.ok) {
            console.log("HTTP Error:", response.status);
            return;
        }
        let result = await response.json();
        return result;
    } catch (err) {
        console.log(err)
    }
}

export { get, post }