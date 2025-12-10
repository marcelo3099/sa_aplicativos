// theme.js - Definições de cores e estilos globais
const theme = {
  colors: {
    primary: '#6A0DAD',    // Roxo forte
    secondary: '#9B4DCA',  // Roxo mais fraco
    white: '#FFFFFF',      // Branco
    black: '#000000',      // Preto
    gray: '#f5f5f5',       // Cinza claro
    lightGray: '#f9f9f9',  // Cinza mais claro
    darkGray: '#666',      // Cinza escuro
    border: '#ddd',        // Cor da borda
    shadow: '#000',        // Cor da sombra
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  borderRadius: {
    small: 5,
    medium: 8,
    large: 10,
  },
};

export default theme;