require('dotenv').config()
require('colors')
const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
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
                const lugar = await leerInput('Ciudad: ')
                await busquedas.ciudad(lugar)

                //buscar los lugares

                //seleccionar el lugar

                //datos del clima

                //mostrar resultados
                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad: ', )
                console.log('Lat: ', )
                console.log('Lng: ', )
                console.log('Temperatura: ', )
                console.log('Mínima: ', )
                console.log('Máxima: ', )
        }

        if(opt !== 0) await pausa()

    }while(opt !== 0)

}

main();

