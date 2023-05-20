import '../assets/tooltip.css'

export default {
  install: (app, options) => {
    
    app.directive('tooltip', {
      mounted: (el, binding) => {
        if (!binding.value) return
        el.insertAdjacentHTML('beforeend',`<div class="v-tooltip">${binding.value.click || binding.value}</div>`)
        let tooltip = el.querySelector('.v-tooltip')
        let clickTimeout
        const tooltipPos = ()=>{
          let rect = el.getBoundingClientRect()
          let rect2 = tooltip.getBoundingClientRect()
          tooltip.style.top = rect.y+rect.height+10+'px'
          if (!(rect2.width > rect2.left)) {
            tooltip.style.left = rect.x+rect.width/2-tooltip.offsetWidth/2+'px'
          }
          rect2 = tooltip.getBoundingClientRect()//to recalcuate after above changes
          if (rect2.right+10 > window.innerWidth) {
            tooltip.style.left = rect.right-rect2.width*1.15+'px'
          }
          if (rect2.bottom > window.innerHeight) {
            tooltip.style.bottom = rect.y-rect.height-10+'px'
          }
        }

        el.addEventListener('mouseenter', ()=>{
          if (!binding.value.click)  {
            tooltipPos()
            tooltip.classList.add("v-tooltip-show")
          }
        })

        el.addEventListener('mouseleave', ()=>{
          if (!binding.value.click) el.querySelector('.v-tooltip').classList = 'v-tooltip'
        })

        if (binding.value.click) {
          el.addEventListener('click', ()=>{
            tooltipPos()
            clearTimeout(clickTimeout)
            tooltip.classList.add("v-tooltip-show")
            clickTimeout = setTimeout(()=> el.querySelector('.v-tooltip').classList = 'v-tooltip', 2000)
          })
        }
      },

      updated: (el, binding) => {
        el.querySelector('.v-tooltip').innerText = binding.value.click || binding.value  
      },
  
      unmounted: (el, binding) => {
        if (el && el.querySelector('.v-tooltip')) el.querySelector('.v-tooltip').innerText = binding.value.click || binding.value
      },
      
      unbind: (el) => {
        if (el && el.querySelector('.v-tooltip')) el.querySelector('.v-tooltip').remove()
      }
    })
  }
}