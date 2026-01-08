// theme-toggle.js: inserta o quita el stylesheet "css/urban-black.css" según el checkbox
(function(){
  const THEME_KEY = 'site-theme';
  const LINK_ID = 'urban-black-stylesheet';
  const HREF = 'css/urban-black.css';

  function addLink(){
    if(document.getElementById(LINK_ID)) return;
    const link = document.createElement('link');
    link.id = LINK_ID;
    link.rel = 'stylesheet';
    link.href = HREF;
    document.head.appendChild(link);
  }

  function removeLink(){
    const el = document.getElementById(LINK_ID);
    if(el) el.parentNode.removeChild(el);
  }

  function setTheme(theme){
    if(theme === 'black') addLink(); else removeLink();
    try{ localStorage.setItem(THEME_KEY, theme); }catch(e){}
  }

  document.addEventListener('DOMContentLoaded', function(){
    const checkbox = document.getElementById('checkbox');
    if(!checkbox) return;
    const saved = (function(){ try{ return localStorage.getItem(THEME_KEY); }catch(e){return null}})();
    // Queremos que el estado ACTIVADO (checked) represente el tema claro.
    if(saved === 'black'){
      // tema oscuro guardado: inyectar stylesheet negro y dejar switch DESACTIVADO
      checkbox.checked = false;
      addLink();
    } else {
      // por defecto o 'light': remover stylesheet negro y dejar switch ACTIVADO
      checkbox.checked = true;
      removeLink();
    }

    checkbox.addEventListener('change', function(){
      // checked -> light, unchecked -> black (inverso al comportamiento anterior)
      if(this.checked) setTheme('light'); else setTheme('black');
    });
  });
})();
