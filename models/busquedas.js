const fs = require('fs')

const  Axios  = require('axios')

class Busquedas {

    historial = []
    dbPath = './db/database.json'

    constructor() {
        this.historial = this.leerDB()
    }

    get historialCapitalizado() {
        return this.historial.map(reg => {
            const regArr = reg.split(' ')
            const capArr = regArr.map(str => str.charAt(0).toUpperCase() + str.slice(1))

            return capArr.join(' ')
        })
    }

    get paramsMapbox() {
        return{
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es',       
        }
    }

    get paramsOpenWeather() {
        return{
            appid: process.env.OPENWEATHER_KEY,
            lang: 'es',
            units: 'metric',
        }
    }

    async ciudad (lugar = '') {
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

    async clima (lat, lon) {
        try{
            const response = await Axios({
                method: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    ...this.paramsOpenWeather,
                    lat,
                    lon,
                }
            })

            const { weather, main } = response.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }

        }catch(err){
            console.log(err)
        }

    }

    agregarHistorial(lugar=''){
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }

        this.historial = this.historial.slice(0, 4)

        this.historial.unshift(lugar.toLocaleLowerCase())

        this.grabarDB();
    }

    grabarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB() {
        //Debe de existir...
        if(!fs.existsSync(this.dbPath)){
            return []
        }
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
        const data = JSON.parse(info)
        return data.historial
    }
}

module.exports = Busquedas;