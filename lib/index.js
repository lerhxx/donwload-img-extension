const CHECKBOX_CLASS = 'ex-download'
const CHECKBOX_CHECK_CLASS = 'checked'
const CHECKBOX_CHECK_CLASS_REG = new RegExp(`\\s*${CHECKBOX_CHECK_CLASS}\\s*`)
const CHECKBOX_CLASS_REG = new RegExp(`(^${CHECKBOX_CHECK_CLASS}$|^${CHECKBOX_CHECK_CLASS}\\s+|\\s+${CHECKBOX_CHECK_CLASS}\\s+|\\s+${CHECKBOX_CHECK_CLASS}$)`, 'g')

function createStyle() {
    const style = document.createElement('style')
    const rules = {
        '.pin': {
            position: 'relative'
        },
        [`.pin:hover .${CHECKBOX_CLASS}`]: {
            display: 'block'
        },
        [`.${CHECKBOX_CLASS}`]: {
            position: 'absolute',
            top: '10px',
            left: '50%',
            // display: 'none',
            width: '20px',
            height: '20px',
            'margin-left': '-10px',
            background: '#fff',
            'border-radius': '4px'
        },
        [`.${CHECKBOX_CLASS}::after`]: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '20px',
            height: '20px',
            content: ''
        },
        [`.${CHECKBOX_CLASS}.${CHECKBOX_CHECK_CLASS}:after`]: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            content: '√',
            color: 'blue'
        }
    }

    document.head.appendChild(style)
    let rulesStr = ''
    for (var ele in rules) {
        rulesStr = ele + '{';
        for (var attr in rules[ele]) {
            rulesStr += attr + ': ' + rules[ele][attr] + ';';
        }
        rulesStr += '} ';
        style.sheet.insertRule(rulesStr, 0);
    }
}

function createCheckbox() {
    const checkBox = document.createElement('div')
    checkBox.setAttribute('class', CHECKBOX_CLASS)
    addCheckEvent(checkBox)
    return checkBox
}

function addCheckEvent(checkBox) {
    checkBox.addEventListener('click', function(e) {
        const target = e.target
        const className=  target.className
        const hasChecked = CHECKBOX_CLASS_REG.test(target.className)
        const newClass = hasChecked ? className.replace(CHECKBOX_CHECK_CLASS_REG, '') : `${className} ${CHECKBOX_CHECK_CLASS}`
        checkBox.innerText = hasChecked ? '' : '√'
        target.setAttribute('class', `${newClass}`)
    })
}

(function() {
    createStyle()
    const wraps = Array.from(document.getElementsByClassName('pin'))
    const imgs = wraps.map(wrap => {
        const checkBox = createCheckbox()
        wrap.appendChild(checkBox)
        wrap.appendChild(checkBox)
        const imgWrap = wrap.getElementsByClassName('layer-view')[0]
        return imgWrap.getElementsByTagName('img')[0].src
    })
    console.log('a', imgs)
})()