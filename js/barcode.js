const defaultValues = {
  CODE128: 'Example 1234',
  CODE128A: 'EXAMPLE',
  CODE128B: 'Example text',
  CODE128C: '12345678',
  EAN13: '1234567890128',
  EAN8: '12345670',
  UPC: '123456789999',
  CODE39: 'EXAMPLE TEXT',
  ITF14: '10012345000017',
  ITF: '123456',
  MSI: '123456',
  MSI10: '123456',
  MSI11: '123456',
  MSI1010: '123456',
  MSI1110: '123456',
  pharmacode: '1234',
}

const barcode = document.getElementById('barcode')
const invalid = document.getElementById('invalid')

const rangeControls = document.querySelectorAll('[type="range"]')
const colorContorls = document.querySelectorAll('[type="color"]')

const barcodeType = document.getElementById('barcodeType')
// const foregroundTransparent = document.getElementById('foregroundTransparent')
const backgroundTransparent = document.getElementById('backgroundTransparent')

const userInput = document.getElementById('userInput')
const textAligns = document.getElementsByName('textAlign')
const textPositions = document.getElementsByName('textPosition')
const fontFamily = document.getElementById('fontFamily')
const fontOptions = document.getElementsByName('fontOption')

document.addEventListener('DOMContentLoaded', () => {
  for (let i of rangeControls) {
    i.oninput = newBarcode
  }

  for (let i of colorContorls) {
    i.oninput = newBarcode
  }

  barcodeType.onchange = () => {
    userInput.value = defaultValues[barcodeType.value]
    newBarcode()
  }

  backgroundTransparent.onclick = newBarcode

  // foregroundTransparent.onclick = newBarcode

  userInput.oninput = newBarcode

  document.getElementById('show').onclick = () => {
    newBarcode()
  }
  document.getElementById('hide').onclick = () => {
    newBarcode()
  }

  for (let i of textAligns) {
    i.onclick = newBarcode
  }

  for (let i of textPositions) {
    i.onclick = newBarcode
  }

  fontFamily.onchange = () => {
    fontFamily.style.fontFamily = fontFamily.value
    newBarcode()
  }

  for (let i of fontOptions) {
    i.onclick = newBarcode
  }

  newBarcode()
})

const getFontOptions = () => {
  const fontOptionsChecked = document.querySelectorAll('input[name="fontOption"]:checked')
  let result = ''
  for (let i of fontOptionsChecked) {
    result += i.value + ' '
  }

  return result
}

const newBarcode = () => {
  JsBarcode('#barcode', userInput.value, {
    format: barcodeType.value,
    ////////// special begin
    // ean128: true, // CODE128
    // flat: true, // EAN-13, EAN-8 and UPC
    // lastChar: '>', // EAN-13
    // mod43: true, // CODE39
    ////////// special end
    width: document.getElementById('barWidth').value,
    height: parseInt(document.getElementById('barHeight').value),
    margin: parseInt(document.getElementById('margin').value),
    // marginTop: ,
    // marginBottom: ,
    // marginLeft: ,
    // marginRight: ,
    lineColor: document.getElementById('foregroundColor').value, // + (foregroundTransparent.checked ? '00' : 'ff'),
    background: document.getElementById('backgroundColor').value + (backgroundTransparent.checked ? '00' : 'ff'),
    displayValue: document.getElementById('show').checked, //document.querySelector('input[name="showText"]:checked').value === 'true',
    textAlign: document.querySelector('input[name="textAlign"]:checked').value,
    textPosition: document.querySelector('input[name="textPosition"]:checked').value,
    textMargin: parseInt(document.getElementById('textMargin').value),
    font: fontFamily.value,
    fontSize: parseInt(document.getElementById('fontSize').value),
    fontOptions: getFontOptions(),
    valid: (valid) => {
      if (valid) {
        barcode.classList.remove('d-none')
        invalid.classList.add('d-none')
      } else {
        barcode.classList.add('d-none')
        invalid.classList.remove('d-none')
      }
    },
  })

  document.getElementById('barWidthDisplay').innerText = document.getElementById('barWidth').value
  document.getElementById('barHeightDisplay').innerText = document.getElementById('barHeight').value
  document.getElementById('marginDisplay').innerText = document.getElementById('margin').value
  document.getElementById('textMarginDisplay').innerText = document.getElementById('textMargin').value
  document.getElementById('fontSizeDisplay').innerText = document.getElementById('fontSize').value
}

document.getElementById('download').onclick = () => {
  var link = document.createElement('a')
  link.download = 'barcode.png'
  link.href = barcode.toDataURL()
  link.click()
}
