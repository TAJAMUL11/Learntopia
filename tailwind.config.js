export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-bg-color' : '#1F1632',
        'light-bg-color' : '#413065',
        'button-bg-color' : '#A584EB',
        'highlighted-btn-bg' : '#7BBFF2',
        
      },
      boxShadow:{
        'custom-shadow': '0 0 0.3rem #000'

      },
      screens:{
        'mediumPhone' : '420px',
        'tablets' : '525px',
        'lgScreen' : '1350px'
      },
    },
  },
  plugins: [],
}