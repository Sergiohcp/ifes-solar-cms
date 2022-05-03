module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/panel/generate-energy',
        handler: 'panel.generateEnergy',
        config: {
            auth: false,
        },
      },
      {
        method: 'POST',
        path: '/panel/best-panels',
        handler: 'panel.bestPanels',
        config: {
            auth: false,
        },
      },
    ],
  };