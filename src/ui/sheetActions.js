var sheetActionsPool = []
function sheetActions (optionsSheet) {
  let model = sheetActionsPool.pop()
  if (model === undefined) {
    let elWrapper = document.createElement('div')
    elWrapper.style.width = '100%'
    elWrapper.style.transform = 'translate3d(0,100%,0)'
    elWrapper.style.transition = 'all .3s linear'
    elWrapper.style.position = 'absolute'
    elWrapper.style.bottom = '0'
    elWrapper.style.left = '0'
    elWrapper.style.padding = '10px'
    elWrapper.style.backgroundColor = '#ccc'
    elWrapper.addEventListener('click', function () {
      elWrapper.style.transform = 'translate3d(0,100%,0)'
      elWrapper.addEventListener('transitionend', function () {
        elWrapper.remove()
      })
    })
    optionsSheet.forEach((element) => {
      let elItem = document.createElement('div')
      elItem.style.lineHeight = '44px'
      elItem.innerText = element.text
      elItem.style.textAlign = 'center'
      elItem.addEventListener('click', element.action)
      elWrapper.appendChild(elItem)
    }, this)
    setTimeout(() => {
      elWrapper.style.transform = 'translate3d(0,0,0)'
    }, 0)
    document.documentElement.appendChild(elWrapper)
  }
}

export default sheetActions
