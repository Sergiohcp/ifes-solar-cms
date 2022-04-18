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
    ],
  };