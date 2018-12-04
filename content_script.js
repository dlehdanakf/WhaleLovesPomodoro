chrome.runtime.sendMessage(chrome.runtime.id, JSON.stringify({
    type: 'validateURL',
    data: {
        link: location.href
    }
}));