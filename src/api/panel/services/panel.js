'use strict';

const { getIncidence, getGeneratedEnergy, getRequiredPanels } = require('../../utils/calculations');
const { months } = require('../../utils/month');

/**
 * panel service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::panel.panel', ({ strapi }) =>  ({
    async generateEnergy(id, latitude, longitude) {

        const panelFound = await strapi.entityService.findOne('api::panel.panel', id);

        const incidence = getIncidence(latitude, longitude)
        const energy = {
            anual: getGeneratedEnergy(incidence.anual, panelFound.area, panelFound.efficiency, panelFound.ptc, panelFound.temperature)
        }
        for (var i = 0; i < 12; i++) {
            energy[months[i]] = getGeneratedEnergy(incidence[months[i]], panelFound.area, panelFound.efficiency, panelFound.ptc, panelFound.temperature)
        }

        return {
            latitude,
            longitude,
            energy
        }
    },
    async bestPanels(consumption, latitude, longitude) {

        const panels = await strapi.entityService.findMany('api::panel.panel')

        const incidence = getIncidence(latitude, longitude)

        const result = panels.map(panel => {
            let energyPerMonth = {}
            let minPanels = 0;
            for (var i = 0; i < 12; i++) {
                const energy = getGeneratedEnergy(incidence[months[i]], panel.area, panel.efficiency, panel.ptc, panel.temperature) * 30
                energyPerMonth[months[i]] = energy;
                const requiredPanels = getRequiredPanels(consumption[months[i]], energy)
                if (requiredPanels > minPanels) minPanels = requiredPanels;
            }

            for (var i = 0; i < 12; i++) {
                energyPerMonth[months[i]] = energyPerMonth[months[i]] * minPanels
            }

            return {
                id: panel.id,
                producer: panel.producer,
                name: panel.name,
                requiredPanels: minPanels,
                energyPerMonth
            }
        })

        return result;
    },
}));
  