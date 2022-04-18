'use strict';

const { energyEquation } = require('../../utils/calculations');

/**
 * panel service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::panel.panel', ({ strapi }) =>  ({
    async generateEnergy(id, latitude, longitude) {

        const panelFound = await strapi.entityService.findOne('api::panel.panel', id);

        const energy = energyEquation()

        return energy
    },
}));
  