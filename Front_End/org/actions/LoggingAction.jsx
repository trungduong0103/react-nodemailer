export function logIn(cred) {
    return function (dispatch) {
        fetch(`http://104.248.247.26:3000/login`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(cred)
        })
            .then((res) => res.json())

            .then(data => {
                sessionStorage.setItem("state", cred.username)
                if (data) {
                    dispatch({ type: 'LOG_IN', payload: cred })
                    sessionStorage.setItem('email', data[0].email)
                }
                else {
                    dispatch({ type: 'INVALID'})
                }
            })
    }
}

export function register(cred) {
    return function (dispatch) {
        fetch(`http://104.248.247.26:3000/register`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(cred)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.registration === 'successful') {
                    dispatch({ type: 'REGISTER', payload: data })
                }
                else {
                    dispatch({ type: 'REGISTER', payload: data })
                }
            })
    }
}