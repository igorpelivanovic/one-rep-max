function generateTooltipContainer(content, style) {
  const container = document.createElement('div')
  container.classList.add('tooltip-container')
  Object.assign(container.style, style)
  const paragraph = document.createElement('p')
  paragraph.innerText = content
  container.appendChild(paragraph)
  document.body.appendChild(container)
  return container
}

function positionContainer(target, el) {
  const elStyle = {
    transformOrigin: 'left',
  }
  const targetPosition = target.getBoundingClientRect()
  const elPosition = el.getBoundingClientRect()
  const { left, origin: originLeft } = positionContainerX(targetPosition, elPosition)
  const { top, origin: originTop, ...data } = positionContainerY(targetPosition, elPosition)
  elStyle.transform = `translate(${left}, ${top})`
  elStyle.transformOrigin = `${originTop} ${originLeft}`

  Object.assign(elStyle, { ...data })

  Object.assign(el.style, elStyle)
}

function positionContainerY(target, el) {
  if (window.innerHeight - (target.top + target.height) > el.height)
    return { top: Math.ceil(window.scrollY + target.top + target.height) + 'px', origin: 'top' }
  if (target.top > el.height)
    return { top: Math.floor(window.scrollY + target.top - el.height) + 'px', origin: 'bottom' }
  if (window.innerHeight - (target.top + target.height) > target.top)
    return {
      top: Math.ceil(target.top + target.height) + 'px',
      origin: 'top',
      height: window.innerHeight - (target.top + target.height) + 'px',
    }
  return {
    top: Math.floor(target.top) + 'px',
    origin: 'bottom',
    height: target.top,
  }
}

function positionContainerX(target, el) {
  if (window.innerWidth - (target.left + target.width) > el.width)
    return { left: Math.ceil(target.left + target.width) + 'px', origin: 'left' }
  if (target.left > el.width) {
    return {
      left: Math.floor(target.left) + 'px',
      origin: 'right',
    }
  }
  return {
    left: '0px',
    origin: 'center',
    width: window.innerWidth + 'px',
  }
}

export default {
  mounted: (el, binding) => {
    let tooltipContainer = null
    el.addEventListener('mouseover', () => {
      if (tooltipContainer) return
      const { maxWidth = 250, maxHeight = 150, content } = binding.value
      tooltipContainer = generateTooltipContainer(content, {
        maxWidth: maxWidth + 'px',
        maxHeight: 'auto',
      })
      positionContainer(el, tooltipContainer)
    })
    el.addEventListener('mouseleave', () => {
      if (tooltipContainer) {
        tooltipContainer.remove()
        tooltipContainer = null
      }
    })
  },
}
