'use strict';

/**
 * panel service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::panel.panel');
