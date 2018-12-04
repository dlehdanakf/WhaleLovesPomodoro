import React from 'react';
import ReactDOM from "react-dom";
import '@babel/polyfill';
import 'chrome-extension-async';

import App from './App';

import './index.scss';
import './images/pomodoro_normal.png';
import './images/pomodoro_rotten.png';
import './images/pomodoro_basket.png';
import './images/pomodoro_basket_small.png';
import './images/star.png';
import './images/star_placeholder.png';
import './images/whale_contest.png';

import {
    showAlert, invokeNotification, setAsyncStorage,
    getAsyncStorage, clearAsyncStorage,
    getApplicationEnvironment, sendApplicationStatus
} from './BrowserAPI';

document.addEventListener('DOMContentLoaded', async () => {
    window.tomato = {
        showAlert: showAlert,
        invokeNotification: invokeNotification,
        setAsyncStorage: setAsyncStorage,
        getAsyncStorage: getAsyncStorage,
        clearAsyncStorage: clearAsyncStorage,
        getApplicationEnvironment: getApplicationEnvironment,
        sendApplicationStatus: sendApplicationStatus
    };

    const env = await getApplicationEnvironment();
    ReactDOM.render(<App ref={e => window.pomodoro = e} environment={env} />, document.getElementById('app'));

    chrome.runtime.onMessage.addListener(function(message){
        var decoded = JSON.parse(message);
        var d = decoded.data;

        switch(decoded.type){
            case 'makeTomatoRotten': window.pomodoro.makeTomatoRotten(d.message);
        }
    });
});