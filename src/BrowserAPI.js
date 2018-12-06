const isJsonType = (text) => {
    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
    {
        return true;
    } else {
        return false;
    }
};
const getTodayDate = () => {
    const today = new Date();
    let yyyy = today.getFullYear(),
        mm = today.getMonth() + 1,
        dd = today.getDate();

    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }

    return ([yyyy, mm, dd]).join('-');
};

const showAlert = e => alert(e);
const invokeNotification = (t, m, i, r) => {
    chrome.runtime.sendMessage(chrome.runtime.id, JSON.stringify({
        type: 'notification',
        data: {
            title: t,
            message: m,
            icon: i,
            ringtone: r
        }
    }));
};

const setAsyncStorage = async (e) => {
    if(typeof e !== typeof {a: 'b'}) return;
    await chrome.storage.sync.set(e);
};
const getAsyncStorage = async (e) => {
    return await chrome.storage.sync.get(e);
};
const clearAsyncStorage = async () => {
    return await chrome.storage.sync.clear();
};

const getApplicationEnvironment = async () => {
    const todayDate = getTodayDate();

    let {
        isTutorialComplete, workLimitSeconds, relaxLimitSeconds,
        siteList, siteMode, workMode, today,
        todayTomato, totalTomato, totalStar
    } = await chrome.storage.sync.get([
        'isTutorialComplete', 'workLimitSeconds',
        'relaxLimitSeconds', 'siteList', 'siteMode',
        'workMode', 'today', 'todayTomato',
        'totalTomato', 'totalStar'
    ]);

    if(isTutorialComplete == 'Y') { isTutorialComplete = true; }
    else { isTutorialComplete = false; }

    if(parseInt(workLimitSeconds) > 0) workLimitSeconds = parseInt(workLimitSeconds);
    else workLimitSeconds = 1500;
    if(parseInt(relaxLimitSeconds) > 0) relaxLimitSeconds = parseInt(relaxLimitSeconds);
    else relaxLimitSeconds = 300;

    if( siteList === undefined || !isJsonType(siteList) || typeof JSON.parse(siteList) !== typeof []){ siteList = []; }
    else siteList = JSON.parse(siteList);
    if( todayTomato === undefined || !isJsonType(todayTomato) || typeof JSON.parse(todayTomato) !== typeof []){ todayTomato = []; }
    else todayTomato = JSON.parse(todayTomato);

    if(parseInt(totalTomato) > 0) totalTomato = parseInt(totalTomato);
    else totalTomato = 0;
    if(parseInt(totalStar) > 0) totalStar = parseInt(totalStar);
    else totalStar = 0;

    if(today === undefined || today != todayDate) {
        setAsyncStorage({ today: todayDate, todayTomato: JSON.stringify([]) });
        today = todayDate;
        todayTomato = [];
    };

    if(!(['Blacklist', 'Whitelist']).includes(siteMode)) siteMode = 'Blacklist';
    if(!(['Offline', 'Online']).includes(workMode)) workMode = 'Online';

    return {
        isTutorialComplete, workLimitSeconds,
        relaxLimitSeconds, siteList, siteMode,
        workMode, today, todayTomato,
        totalTomato, totalStar
    };
};
const sendApplicationStatus = async (e) => {
    const { mode, status, workMode, siteMode, blockedSiteList } = e;
    await chrome.runtime.sendMessage(chrome.runtime.id, JSON.stringify({
        type: 'updateApplicationStatus',
        data: {
            mode, status, workMode,
            siteMode, blockedSiteList
        }
    }));
}

export { showAlert, invokeNotification, setAsyncStorage, getAsyncStorage, clearAsyncStorage, getApplicationEnvironment, sendApplicationStatus };