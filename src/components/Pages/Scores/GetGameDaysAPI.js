import axios from 'axios'

export default class API {
    getData = () => {
        return axios.get('http://hockey.mutsaers.nu:5000/gamedays')
            .then(response => {
                console.log("res: " + response.data[0].title)
                if (response.data.length > 0) {
                    var data = response.data
                    return data
                } else {
                    throw new Error('Empty data')
                }
            })
            .catch(function (error) {
                console.log(error)
                return [] // Return empty array in case error response.
            })
    }
}

