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
  }));