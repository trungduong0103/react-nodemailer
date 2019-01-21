export function sendFeedback(feedback){
    return function(dispatch){
        fetch(`http://104.248.247.26:3000/food/feedback/${feedback._id}`,{
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }, 
            method:'PUT',
            body: JSON.stringify(feedback)
        })
    }
}