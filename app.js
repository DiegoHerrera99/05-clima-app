require('dotenv').config()
require('colors')
const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
    
    const busquedas = new Busquedas()
    let opt;

    do{
        opt = await inquirerMenu()
        console.log({ans: opt})

        switch(opt) {
            case 1:
                //mostrar mensaje
                const busqueda = await leerInput('Ciudad: ')

                //buscar los lugares
                const resultados = await busquedas.ciudad(busqueda)

                //seleccionar el lugar
                const id = await listarLugares(resultados)
                const lugarSel = resultados.find(l => l.id === id)

                //datos del clima

                //mostrar resultados
                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad: ', lugarSel.name)
                console.log('Lat: ', lugarSel.lat)
                console.log('Lng: ', lugarSel.lng)
                console.log('Temperatura: ', )
                console.log('Mínima: ', )
                console.log('Máxima: ', )
        }

        if(opt !== 0) await pausa()

    }while(opt !== 0)

}

main();

