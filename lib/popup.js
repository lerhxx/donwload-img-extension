window.onload = () => {
    const downloadBtn = document.getElementById('img-download')
    downloadBtn.addEventListener('click', () => {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true
            },
            (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    action: 'download'
                },
                data => {
                    console.log('data', data)
                }
            )
        })
    })
}