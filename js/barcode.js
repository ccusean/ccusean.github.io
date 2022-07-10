const defaultValues = {
  CODE128: 'Example1234',
  CODE128A: 'EXAMPLE1234',
  CODE128B: 'Example 1234',
  CODE128C: '12345678',
  EAN13: '1234567890128',
  EAN8: '96385074',
  EAN5: '54495',
  EAN2: '53',
  UPC: '123456789999',
  CODE39: 'CODE39 Barcode',
  ITF14: '12345678901231',
  ITF: '123456',
  MSI: '1234',
  MSI10: '1234',
  MSI11: '1234',
  MSI1010: '1234',
  MSI1110: '1234',
  pharmacode: '1234',
}

const checkboxControls = document.querySelectorAll('[type="checkbox"]')
const radioControls = document.querySelectorAll('[type="radio"]')
const rangeControls = document.querySelectorAll('[type="range"]')
const colorContorls = document.querySelectorAll('[type="color"]')

const barcode = document.getElementById('barcode')
const invalid = document.getElementById('invalid')

const barcodeType = document.getElementById('barcodeType')
const lastChar = document.getElementById('lastChar')

const userInput = document.getElementById('userInput')
const fontFamily = document.getElementById('fontFamily')

document.addEventListener('DOMContentLoaded', () => {
  for (let i of checkboxControls) {
    i.oninput = newBarcode
  }
  for (let i of radioControls) {
    i.oninput = newBarcode
  }
  for (let i of rangeControls) {
    i.oninput = newBarcode
  }
  for (let i of colorContorls) {
    i.oninput = newBarcode
  }

  barcodeType.onchange = () => {
    userInput.value = defaultValues[barcodeType.value]

    if (
      barcodeType.value === 'CODE128' ||
      barcodeType.value === 'CODE128A' ||
      barcodeType.value === 'CODE128B' ||
      barcodeType.value === 'CODE128C'
    ) {
      document.getElementById('ean128Ui').classList.remove('d-none')
    } else {
      document.getElementById('ean128Ui').classList.add('d-none')
    }

    if (barcodeType.value === 'EAN13' || barcodeType.value === 'EAN8' || barcodeType.value === 'UPC') {
      document.getElementById('flatUi').classList.remove('d-none')
    } else {
      document.getElementById('flatUi').classList.add('d-none')
    }

    if (barcodeType.value === 'EAN13') {
      document.getElementById('lastCharUi').classList.remove('d-none')
    } else {
      document.getElementById('lastCharUi').classList.add('d-none')
    }

    if (barcodeType.value === 'CODE39') {
      document.getElementById('mod43Ui').classList.remove('d-none')
    } else {
      document.getElementById('mod43Ui').classList.add('d-none')
    }

    newBarcode()
  }

  lastChar.oninput = newBarcode

  userInput.oninput = newBarcode

  fontFamily.onchange = () => {
    fontFamily.style.fontFamily = fontFamily.value
    newBarcode()
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

const hexToRgb = (hex, alpha) => {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (0 <= alpha && alpha <= 1) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  } else {
    return `rgb(${r}, ${g}, ${b})`
  }
}

const newBarcode = () => {
  JsBarcode('#barcode', userInput.value, {
    format: barcodeType.value,
    ean128: document.getElementById('ean128').checked,
    flat: document.getElementById('flat').checked,
    lastChar: document.getElementById('lastCharEnable').checked ? document.getElementById('lastChar').value : '',
    mod43: document.getElementById('mod43').checked,
    width: document.getElementById('barWidth').value,
    height: parseInt(document.getElementById('barHeight').value),
    margin: parseInt(document.getElementById('margin').value),
    // marginTop: parseInt(document.getElementById('marginTop').value),
    // marginBottom: parseInt(document.getElementById('marginBottom').value) ,
    // marginLeft: parseInt(document.getElementById('marginLeft').value) ,
    // marginRight: parseInt(document.getElementById('marginRight').value) ,
    lineColor: hexToRgb(
      document.getElementById('foregroundColor').value,
      document.getElementById('foregroundAlpha').value / 100
    ),
    // document.getElementById('foregroundColor').value +
    // (document.getElementById('foregroundTransparent').checked ? '00' : 'ff'),
    background: hexToRgb(
      document.getElementById('backgroundColor').value,
      document.getElementById('backgroundAlpha').value / 100
    ),
    displayValue: document.getElementById('showText').checked,
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

  document.getElementById('barWidthValue').innerText = document.getElementById('barWidth').value
  document.getElementById('barHeightValue').innerText = document.getElementById('barHeight').value
  document.getElementById('marginValue').innerText = document.getElementById('margin').value
  document.getElementById('foregroundAlphaValue').innerText = document.getElementById('foregroundAlpha').value + '%'
  document.getElementById('backgroundAlphaValue').innerText = document.getElementById('backgroundAlpha').value + '%'
  // document.getElementById('marginTopValue').innerText = document.getElementById('marginTop').value
  // document.getElementById('marginBottomValue').innerText = document.getElementById('marginBottom').value
  // document.getElementById('marginLeftValue').innerText = document.getElementById('marginLeft').value
  // document.getElementById('marginRightValue').innerText = document.getElementById('marginRight').value
  document.getElementById('textMarginValue').innerText = document.getElementById('textMargin').value
  document.getElementById('fontSizeValue').innerText = document.getElementById('fontSize').value
}

document.getElementById('download').onclick = () => {
  const link = document.createElement('a')
  link.download = 'barcode.png'
  link.href = barcode.toDataURL()
  link.click()
}
