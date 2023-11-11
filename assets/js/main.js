(function(){
  
  const botao_menu = document.getElementsByClassName('botao-menu')[0];
  const body = document.getElementsByTagName('body')[0];

  botao_menu.addEventListener('click', function() {
    body.classList.toggle( 'menu-aberto');
  })

})();
