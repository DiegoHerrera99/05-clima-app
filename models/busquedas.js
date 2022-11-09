const  Axios  = require('axios')

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San José']

    constructor() {
        //TODO: leer DB si existe
    }

    get paramsMapbox() {
        return{
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es',       
        }
    }

    async ciudad (lugar = '') {
        //peticion http
        try{
            const response = await Axios({
                method: 'GET',
                url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })
            console.log(response.data)

            return [] //retornar los lugares

        }catch(err){
            return []
        }
    }
}

module.exports = Busquedas;