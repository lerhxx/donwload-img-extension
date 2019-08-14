const PARENT_CLASS = 'pin'
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
            width: '20px',
            height: '20px',
            'margin-left': '-10px',
            'text-align': 'center',
            'line-height': '20px',
            background: '#fff',
            'border-radius': '4px',
            cursor: 'pointer'
        },
        [`.${CHECKBOX_CLASS}.${CHECKBOX_CHECK_CLASS}`]: {
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
        const parent = target.parentNode
        const className=  parent.className
        const hasChecked = CHECKBOX_CLASS_REG.test(parent.className)
        const newClass = hasChecked ? className.replace(CHECKBOX_CHECK_CLASS_REG, '') : `${className} ${CHECKBOX_CHECK_CLASS}`
        parent.setAttribute('class', `${newClass}`)
        target.innerText = hasChecked ? '' : '✔️'
    })
}

function handleDownload() {
    return new Promise((resolve, reject) => {
        const checked = document.getElementsByClassName(`${PARENT_CLASS} ${CHECKBOX_CHECK_CLASS}`)
        console.log('checked', checked)
        if (!checked.length) {
            resolve()
        }
        Array.from(checked).forEach(checkWrap => {
            const imgWrap = checkWrap.getElementsByClassName('layer-view')[0]
            if (!imgWrap) {
                return
            }
            const imgSrc = ( imgWrap.getElementsByTagName('img')[0] || {}).src
            imgSrc && fetch(imgSrc)
                        .then(() => {
                            console.log('ok')
                            resolve()
                        })
        })

    })
}

(function() {
    createStyle()
    const wraps = Array.from(document.getElementsByClassName(PARENT_CLASS))
    const imgs = wraps.map(wrap => {
        const checkBox = createCheckbox()
        wrap.appendChild(checkBox)
        wrap.appendChild(checkBox)
        const imgWrap = wrap.getElementsByClassName('layer-view')[0] || {}
        return ( imgWrap.getElementsByTagName('img')[0] || {}).src
    })
    console.log('a', imgs)

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('request', request)
        const { action } = request
        if (action === 'download') {
            handleDownload()
                .then(sendResponse)
                .catch(err => {
                    console.log('err', err)
                })
        }
    })
})()