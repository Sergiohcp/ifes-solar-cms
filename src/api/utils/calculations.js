
const globalHorizontalIncidence = require('../data/global_horizontal_incidence.json');

function energyEquation() {
    console.log(globalHorizontalIncidence)
    // npv = 0.14 npcu = 0.98 Ts = 48.4 Tstd = 25
    // const energy = incidence * area * npv * ( 1 + ( ptc * ( Ts - Tstd ) / 100 ) ) * npcu
}

module.exports = {
    energyEquation
}