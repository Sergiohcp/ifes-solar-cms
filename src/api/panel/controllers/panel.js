'use strict';

/**
 *  panel controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

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
      ctx.response.status = 400;
      return {
        status: 400,
        message: "Erro ao realizar requisicao"
      }
    }

    try {
      const generatedEnergy = await strapi.service('api::panel.panel').generateEnergy(id, latitude, longitude);
      return {
        data: generatedEnergy
      }
    } catch (err) {
      return {
        status: 400,
        message: "Erro ao realizar requisicao"
      }
    }
  },
  }));