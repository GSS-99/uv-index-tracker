export async function saveLocationApi(locationInfo){
    const response = await fetch('/api/locations', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'}, 
        body: JSON.stringify(locationInfo)
    });
    if (!response.ok) { 
        throw new Error ('Failed to save location.')
    }
    return await response.json();
};