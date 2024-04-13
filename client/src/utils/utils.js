const getHeaders = () => {
    const accessToken = sessionStorage['accessToken']
    const headers = {'x-access-token': "Bearer " + accessToken}
    return headers
}

export {getHeaders}