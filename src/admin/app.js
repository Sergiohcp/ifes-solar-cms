
import IfesLogo from './extensions/assets/images/ifes-logo.png'
import IfesLogoIcon from './extensions/assets/images/ifes-logo-icon.png'

export default {
  config: {
    auth: {
      logo: IfesLogo,
    },
    menu: {
      logo: IfesLogoIcon,
    },
    theme: {
      colors: {
        primary100: '#d7fae0',
        primary200: '#a6e3b7',
        primary500: '#0e762b',
        primary600: '#0f5b1f',
        primary700: '#194726',
      },
    },
    locales: [
      'pt-BR'
    ],
  },
  bootstrap(app) {
    console.log(app);
  },
};
