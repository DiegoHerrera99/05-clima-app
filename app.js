require('dotenv').config()
require('colors')
const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
    
    const busquedas = new Busquedas()
    let opt;

    do{
        opt = await inquirerMenu()

        switch(opt) {
            case 1:
                //mostrar mensaje
                const busqueda = await leerInput('Ciudad: ')

                //buscar los lugares
                const resultados = await busquedas.ciudad(busqueda)

                //seleccionar el lugar
                const id = await listarLugares(resultados)
                if(id === '0') continue;

                const lugarSel = resultados.find(l => l.id === id)

                //guardar en DB
                busquedas.agregarHistorial(lugarSel.name)

                //datos del clima
                const clima = await busquedas.clima(lugarSel.lat, lugarSel.lng)

                //mostrar resultados
                console.clear()
                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad:', lugarSel.name.green)
                console.log('Lat:', lugarSel.lat)
                console.log('Lng:', lugarSel.lng)
                console.log('Temperatura:', clima.temp)
                console.log('Mínima:', clima.min)
                console.log('Máxima:', clima.max)
                console.log('Cómo está el clima:', clima.desc.green)

                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green
                    console.log(`${idx} ${lugar}`)
                })
                break;
        }

        if(opt !== 0) await pausa()

    }while(opt !== 0)

}

main();

