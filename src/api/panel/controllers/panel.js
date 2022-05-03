'use strict';

const { months } = require('../../utils/month');

/**
 *  panel controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

function error(ctx) {
  ctx.response.status = 400;
  return {
    status: 400,
    message: "Erro ao realizar requisicao"
  }
}

module.exports = createCoreController('api::panel.panel', ({ strapi }) => ({
  async find() {

    const data = await strapi.service('api::panel.panel').find({
      populate: ['producer_image', 'datasheet']
    });

    const dataMapped = data.results.map(item => ({
        ...item,
        producer_image: item.producer_image.url,
        datasheet: item.datasheet.url
    }))

    return { data: dataMapped };
  },
  async generateEnergy(ctx) {
    
    const { id, latitude, longitude } = ctx.request.body

    if (!ctx.request.body || !id || !latitude || !longitude) {
      return error(ctx)
    }

    try {
      const energy = await strapi.service('api::panel.panel').generateEnergy(id, latitude, longitude);
      return {
        data: energy
      }
    } catch (err) {
      return error(ctx)
    }
  },
  async bestPanels(ctx) {
    
    const { consumption, latitude, longitude } = ctx.request.body
    
    let hasUndefinedConsumption = false;
    for (var i = 0; i < 12; i++) {
      if (typeof consumption[months[i]] !== 'number') hasUndefinedConsumption = true
  }

    if (!ctx.request.body || !consumption || hasUndefinedConsumption || !latitude || !longitude) {
      return error(ctx)
    }

    try {
      const bestPanels = await strapi.service('api::panel.panel').bestPanels(consumption, latitude, longitude);
      return {
        data: bestPanels
      }
    } catch (err) {
      return error(ctx)
    }
  },
  }));