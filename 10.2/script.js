const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  let height = window.screen.height
  let width = window.screen.width
  
  if (window.screen.availHeight !== window.screen.height,  window.screen.availWigth !== window.screen.width) {
   window.alert(`${width} : ${height}`)
}
  
})
