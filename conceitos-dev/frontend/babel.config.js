module.exports = { 
  presets: [
    '@babel/preset-env', //converte funcionalidades pro browser (ENV --> ambiente em que está sendo executado)
    '@babel/preset-react' //entende o HTML dentro do JS e converte para o browser
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};