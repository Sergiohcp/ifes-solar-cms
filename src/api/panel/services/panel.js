'use strict';

const { getIncidence, getGeneratedEnergy } = require('../../utils/calculations');
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
}));
  