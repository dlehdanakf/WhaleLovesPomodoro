import domainMatch from 'domain-match';

var applicationEnvironment = {
    mode: 'work',
    status: 'stop',
    workMode: null,
    siteMode: null,
    blockedSiteList: []
};

function onBrowserStateChanged(newState){
    if(
        newState != 'active' &&
        applicationEnvironment.status == 'run' &&
        applicationEnvironment.mode == 'work' &&
        applicationEnvironment.workMode == 'Online'
    ) {
        chrome.runtime.sendMessage(chrome.runtime.id, JSON.stringify({
            type: 'makeTomatoRotten',
            data: {
                message: '장기간 활동흔적이 없습니다.\n집중시간에 자리를 비우시면 안돼요!!  ( ｰ̀εｰ́ )'
            }
        }));
    }
}

function invokeNotificationMessage(title, message, icon, ringtone){
    var _icon = icon,
        _title = title,
        _message = message;

    var isIconValid = (['pomodoro_normal.png', 'pomodoro_basket.png', 'pomodoro_rotten.png']).includes(icon);

    if(!isIconValid) _icon = 'pomodoro_normal.png';
    if(!title) _title = 'Whale loves Pomodoro';
    if(!message) _message = '뽀모도로 타이머에 새로운 알림이 있습니다.';

    chrome.notifications.create(
        'tomato-' + Math.random(),{
            type: 'basic',
            iconUrl: chrome.runtime.getURL('dist/images/' + _icon),
            title: _title,
            message: _message
        }
    );

    if(ringtone){
        var myAudio = new Audio();
        myAudio.src = chrome.runtime.getURL('./ringtone.mp3');
        myAudio.play();
    }
}
function updateApplicationStatus(d){
    applicationEnvironment = {
        mode: d.mode,
        status: d.status,
        workMode: d.workMode,
        siteMode: d.siteMode,
        blockedSiteList: d.blockedSiteList
    };

    switch(status){
        case 'run':

            chrome.idle.onStateChanged.addListener(onBrowserStateChanged);

            return;

        case 'pause':
        case 'stop':
        case 'loading':

            chrome.idle.onStateChanged.removeListener(onBrowserStateChanged);

            return;
    }
}
function validateURL(link) {
    if(applicationEnvironment.status == 'run' && applicationEnvironment.mode == 'work') {
        applicationEnvironment.blockedSiteList.map(function(v){
            var matched = domainMatch(v, link);

            if(
                matched && applicationEnvironment.siteMode == 'Blacklist' ||
                !matched && applicationEnvironment.siteMode == 'Whitelist'
            ){
                chrome.runtime.sendMessage(chrome.runtime.id, JSON.stringify({
                    type: 'makeTomatoRotten',
                    data: {
                        message: '집중시간인데 금지된 사이트에 접근하셨어요!!! (ᗒᗣᗕ)՞'
                    }
                }));
            }
        });
    }
}

chrome.runtime.onMessage.addListener(function(message, sender){
    var decoded = JSON.parse(message);
    var d = decoded.data;

    switch(decoded.type){
        case 'notification': invokeNotificationMessage(d.title, d.message, d.icon, d.ringtone); return;
        case 'updateApplicationStatus': updateApplicationStatus(d); return;
        case 'validateURL': validateURL(d.link); return;
    }
});