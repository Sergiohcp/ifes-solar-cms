
const globalHorizontalIncidence = require('../data/global_horizontal_incidence.json');

const MAX_ERROR = 1.003
const MIN_ERROR = 0.997

function isPositive(number) {
    return Math.sign(number) > 0
}

function verifyCoordinate(coordinate, itemCoordinate) {
    if (isPositive(coordinate)) {
        return (coordinate >= itemCoordinate * MIN_ERROR && coordinate <= itemCoordinate * MAX_ERROR)
    }
    return (coordinate <= itemCoordinate * MIN_ERROR && coordinate >= itemCoordinate * MAX_ERROR)
}

function findLocation (latitude, longitude, item) {
    return verifyCoordinate(latitude, item.latitude) && verifyCoordinate(longitude, item.longitude)
}

function getIncidence(latitude, longitude) {
    const range = globalHorizontalIncidence.filter(item => findLocation(latitude, longitude, item))
    return range.find(item => !!item)
}

function getGeneratedEnergy(incidence, area, efficiency, ptc, temperature) {
    const conditioningUnitEfficiency = 0.98 // Eficiencia da unidade de condicionamento
    const naturalTemperature = 25
    const energy = incidence * area * ( efficiency / 100 ) * ( 1 + ( ptc * ( temperature - naturalTemperature ) / 100 ) ) * conditioningUnitEfficiency
    return energy / 1000
}

module.exports = {
    getIncidence,
    getGeneratedEnergy,
    getRequiredPanels
}