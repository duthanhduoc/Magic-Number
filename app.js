let turn = 1
let numbers = []
const createMagicNumber = (className, role, value) => {
  const node = document.createElement('div')
  node.className = className
  node.innerHTML = `
  <span>${role}</span>
  <span>${value}</span>
  `
  return node
}
const magicNumbersNode = document.querySelector('.magic-numbers')
const resultNode = document.querySelector('.result')
const formNode = document.querySelector('form')
formNode.addEventListener('submit', event => {
  event.preventDefault()
  const value = document.querySelector('form input').value
  const yourNode = createMagicNumber('number number-you', 'Bạn', value)
  document.querySelector('form input').value = ''
  if (turn === 1) {
    result = Number('2' + value) - 2
    resultNode.innerHTML = `
    <div class="result-overlay"></div>
    <span>Dự đoán: ${result}</span>
    `
    resultNode.classList.add('active')
    magicNumbersNode.appendChild(yourNode)
    numbers.push(Number(value))
    turn++
  } else {
    const myNode = createMagicNumber('number number-me', 'Mình', 9999 - Number(value))
    magicNumbersNode.appendChild(yourNode)
    magicNumbersNode.appendChild(myNode)
    numbers.push(Number(value), 9999 - Number(value))
    turn += 2
  }
  if (turn === 6) {
    const sumValue = numbers.reduce((current, result) => result + current)
    const sumNode = createMagicNumber('number number-sum', 'Tổng', sumValue)
    magicNumbersNode.appendChild(sumNode)
    formNode.style.display = 'none'
  }
})
document.querySelector('.btn-reset').addEventListener('click', () => {
  magicNumbersNode.innerHTML = ''
  resultNode.innerHTML = ''
  resultNode.classList.remove('active')
  turn = 1
  numbers = []
  formNode.style = null
})
resultNode.addEventListener('click', () => {
  document.querySelector('.result-overlay').classList.toggle('hide')
})
