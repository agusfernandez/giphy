const togglebutton = document.getElementById('toggle-icon');
const themeMenu = document.getElementById('theme-menu');
const body = document.body;
const logolight = document.getElementById('logo-light');
const logodark = document.getElementById('logo-dark');
const preheader = document.getElementById('pre-header');
const light = document.getElementById('light');
const dark = document.getElementById('dark');
const buttonHeader= document.querySelectorAll('.button-header');
const link = document.querySelectorAll('a');
const toggleIcon = document.querySelector('.toggle-icon');


togglebutton.addEventListener('click', () => {
    themeMenu.classList.toggle('active');
  });


  themeMenu.addEventListener('click', (e) => {
    const theme = e.target.getAttribute('data-theme');
    if (theme === "day") {
       body.classList.remove('dark-mode');
       logolight.classList.add('active');
       logodark.classList.remove('active');
       preheader.classList.remove('dark-preheader');
       light.classList.add('light-btn');
       dark.classList.remove('dark-btn');

       // Itera sobre los botones y aplica las clases correspondientes
       buttonHeader.forEach(button => {
         button.classList.add('button-light');
         button.classList.remove('button-dark');
       });

       // Itera sobre todas las etiquetas <a> y aplica las clases correspondientes
       document.querySelectorAll('a').forEach(link => {
         link.classList.add('link-light');
         link.classList.remove('link-dark');
       });

       toggleIcon.classList.add('toggle-light');
       toggleIcon.classList.remove('toggle-dark');

    } else if (theme === "night") {
        body.classList.add('dark-mode');
        logolight.classList.remove('active');
        logodark.classList.add('active');
        preheader.classList.add('dark-preheader');
        light.classList.remove('light-btn');
        dark.classList.add('dark-btn');

        // Itera sobre los botones y aplica las clases correspondientes
        buttonHeader.forEach(button => {
          button.classList.add('button-dark');
          button.classList.remove('button-light');
        });

        // Itera sobre todas las etiquetas <a> y aplica las clases correspondientes
        document.querySelectorAll('a').forEach(link => {
          link.classList.add('link-dark');
          link.classList.remove('link-light');
        });

        toggleIcon.classList.add('toggle-dark');
        toggleIcon.classList.remove('toggle-light');
    }

    themeMenu.classList.remove('active');
});


