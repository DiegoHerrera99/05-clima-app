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
            return response.data.features.map( ({ id, place_name_es, center }) => ({
                    id,
                    name: place_name_es,
                    lng: center[0],
                    lat: center[1],
                })
            )

        }catch(err){
            return []
        }
    }
}

module.exports = Busquedas;