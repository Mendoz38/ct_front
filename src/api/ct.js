const api_url = process.env.REACT_APP_API_URL;
console.log("En",process.env.REACT_APP_ENV,  ", api_url : ", api_url)
export function getConstant() {
    return fetch(api_url+'/api/v1/book/constant')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });
}
export function getAllRDV() {
    return fetch(api_url+'/api/v1/book')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });
}

export function checkRDV(data) {
    return fetch(api_url+'/api/v1/book/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        throw error;
    });
}

export function addRDV(data) {
    return fetch(api_url+'/api/v1/book/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        throw error;
    });
}

export default getAllRDV;