export function sendOrder(order){
    return function(dispatch){
        fetch(`http://104.248.247.26:3000/sendorder`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(order)
        })
    }
}