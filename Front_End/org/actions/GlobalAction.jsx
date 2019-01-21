export function fetchAllAds() {
    return function (dispatch) {
        fetch(`http://localhost:3000/estates`)
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'FETCH_ALL_ADS',
                    payload: data
                })
            })
    }
}

export function fetchAllProjects() {
    return function (dispatch) {
        fetch('http://localhost:3000/projects')
            .then((res) => { return res.json() })
            .then((data) => {
                dispatch({
                    type: 'FETCH_ALL_PROJECTS',
                    payload: data
                })
            })
    }
}