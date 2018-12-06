import React from 'react';

import Tutorial from './components/tutorial';
import Switcher from './components/switcher';
import Timer from './components/timer';
import TimerSetting from './components/timer.setting';
import WorkType from './components/worktype';
import SiteList from './components/sitelist';
import Harvest from './components/harvest';

class App extends React.Component {
    constructor(props){
        super(props);

        const {
            isTutorialComplete, workLimitSeconds, relaxLimitSeconds,
            siteList, siteMode, workMode, todayTomato,
            totalTomato, totalStar
        } = this.props.environment;

        let _todayTomato = todayTomato;
        if(typeof _todayTomato !== typeof [])
            _todayTomato = [];

        let _siteList = siteList;
        if(typeof _siteList !== typeof [])
            _siteList = [];

        this.loading_timer = {
            timerId: 0, delay: 1000, limit: 10
        };
        this.recurring_timer = {
            timerId: 0, start: new Date(), remaining: 1000, delay: 1000
        };
        this.state = {
            isTutorialComplete: isTutorialComplete,

            mode: 'work',
            status: 'stop',
            showHarvest: false,
            currentSeconds: 0,
            workLimitSeconds: workLimitSeconds,
            relaxLimitSeconds: relaxLimitSeconds,

            workMode: workMode,
            siteMode: siteMode,
            blockedSiteList: _siteList,

            isFresh: true,
            isRewarded: false,
            totalTomato: totalTomato,
            totalStar: totalStar,
            todayTomatoList: _todayTomato
        };

        this.onPressStopTutorial = this.onPressStopTutorial.bind(this);
        this.onPressTimerConfigureButton = this.onPressTimerConfigureButton.bind(this);
        this.onPressStopButton = this.onPressStopButton.bind(this);
        this.onTimerFinished = this.onTimerFinished.bind(this);
        this.onLoadingTimerFinished = this.onLoadingTimerFinished.bind(this);

        this.increaseCurrentSeconds = this.increaseCurrentSeconds.bind(this);
        this.increaseWorkLimitSeconds = this.increaseWorkLimitSeconds.bind(this);
        this.decreaseWorkLimitSeconds = this.decreaseWorkLimitSeconds.bind(this);
        this.increaseRelaxLimitSeconds = this.increaseRelaxLimitSeconds.bind(this);
        this.decreaseRelaxLimitSeconds = this.decreaseRelaxLimitSeconds.bind(this);

        this.addBlockSite = this.addBlockSite.bind(this);
        this.removeBlockSite = this.removeBlockSite.bind(this);

        this.timerResume = this.timerResume.bind(this);
        this.timerPause = this.timerPause.bind(this);
        this.timerStop = this.timerStop.bind(this);

        this.loadingTimerStart = this.loadingTimerStart.bind(this);
        this.loadingTimerStop = this.loadingTimerStop.bind(this);

        this.rewardTomato = this.rewardTomato.bind(this);
        this.makeTomatoRotten = this.makeTomatoRotten.bind(this);
    }
    render(){
        const timerMode = [
            { label: 'On Work', value: 'work' },
            { label: 'Break Time', value: 'break' }
        ];

        if(this.state.isTutorialComplete === false)
            return (
                <Tutorial onPressStopTutorial={this.onPressStopTutorial} />
            );

        return (
            <div id="application">
                <div className="section-header">
                    <div style={{paddingTop: 6, paddingBottom: 6, float: 'left'}}>
                        <Switcher
                            disabled={this.state.status !== 'stop'}
                            labels={timerMode}
                            value={this.state.mode}
                            onChange={(v)=>{
                                this.setState({ mode: v });
                            }}
                        />
                    </div>
                    <div style={{display: 'inline-block', float: 'right'}}>
                        <button
                            type="button"
                            className="app-button app-button-small app-button-subtle"
                            style={{color: '#707070'}}
                            onClick={() => window.open("https://github.com/dlehdanakf/WhaleLovesPomodoro/issues", "_blank")}
                        >
                            {'Need Help?'}
                        </button>
                    </div>
                </div>
                <div className="section-timer">
                    <Timer
                        mode={this.state.mode}
                        status={this.state.status}
                        showHarvest={this.state.showHarvest}
                        limitSeconds={this.state.mode == 'work' ? this.state.workLimitSeconds : this.state.relaxLimitSeconds}
                        currentSeconds={this.state.currentSeconds}
                        totalTomato={this.state.totalTomato}
                        totalStar={this.state.totalStar}
                        onPressTimerConfigureButton={this.onPressTimerConfigureButton}
                    />
                    <TimerSetting
                        status={this.state.status}
                        workLimitSeconds={this.state.workLimitSeconds}
                        relaxLimitSeconds={this.state.relaxLimitSeconds}
                        increaseWorkLimitSeconds={this.increaseWorkLimitSeconds}
                        decreaseWorkLimitSeconds={this.decreaseWorkLimitSeconds}
                        increaseRelaxLimitSeconds={this.increaseRelaxLimitSeconds}
                        decreaseRelaxLimitSeconds={this.decreaseRelaxLimitSeconds}
                    />
                    <WorkType
                        status={this.state.status}
                        workMode={this.state.workMode}
                        onChangeWorkMode={(v) => {
                            this.setState({ workMode: v });
                            window.tomato.setAsyncStorage({ workMode: v });
                        }}
                    />
                    <SiteList
                        status={this.state.status}
                        siteMode={this.state.siteMode}
                        blockedSiteList={this.state.blockedSiteList}
                        addBlockSite={this.addBlockSite}
                        removeBlockSite={this.removeBlockSite}
                        onChangeSiteMode={(v) => {
                            this.setState({ siteMode: v });
                            window.tomato.setAsyncStorage({ siteMode: v });
                        }}
                    />
                    <div className="whale-contest">
                        <span><img src={'images/whale_contest.png'} alt={'whale contest'} /></span>
                        <p>제 1회 웨일 확장앱 콘테스트 출품작입니다</p>
                    </div>
                </div>
                <Harvest
                    todayTomatoList={this.state.todayTomatoList}
                />
            </div>
        );
    }

    onPressStopTutorial(){
        this.setState({ isTutorialComplete: true });
        window.tomato.setAsyncStorage({ isTutorialComplete: 'Y' });
    }
    onPressTimerConfigureButton(e){
        switch(e){
            case 'stop':
                this.onPressStopButton();
                return;
            case 'run':
                this.setState({ status: 'run', showHarvest: false }, () => { window.tomato.sendApplicationStatus(this.state) });
                this.timerResume();
                return;
            case 'pause':
                this.setState({ status: 'pause' }, () => { window.tomato.sendApplicationStatus(this.state) });
                this.timerPause();
                return;
        }
    }
    onPressStopButton(){
        if(
            (
                this.state.status === 'loading'
            ) || (
                this.state.mode !== 'work'
            ) ||
            (
                this.state.mode === 'work' && (
                    this.state.isFresh === false ||
                    confirm("타이머를 초기화하면 시들어진 토마토를 얻게되는데... 그래도 초기화 할까요?")
                )
            )
        ) {
            if(this.state.status !== 'loading' && this.state.mode == 'work' && this.state.isFresh) {
                this.rewardTomato(true);
                window.tomato.invokeNotification('토마토가 시들었어요 ㅠㅠ', '집중시간에 타이머를 종료하여 완전한 토마토를 획득하지 못했습니다.', 'pomodoro_rotten.png', true);
            }

            this.setState({ status: 'stop', currentSeconds: 0, isRewarded: false, isFresh: true, showHarvest: false }, () => { window.tomato.sendApplicationStatus(this.state) });
            this.timerStop();
            this.loadingTimerStop();
        }
    }
    onTimerFinished(){
        if(this.state.mode == 'work' && this.state.isRewarded === false){
            let x = this.rewardTomato();
            window.tomato.invokeNotification('【 집중시간 】 타이머 종료', (x ? '(토마토 +1) ' : '') + '10초 후 타이머 모드가 \'휴식\'으로 변경됩니다.');
        } else if(this.state.mode == 'break') {
            window.tomato.invokeNotification('【 쉬는시간 】 타이머 종료', '10초 후 타이머 모드가 \'집중\'으로 변경됩니다.', 'pomodoro_normal.png', true);
        }

        this.timerStop();
        this.setState({ status: 'loading', currentSeconds: 0, showHarvest: true, isRewarded: false, isFresh: true }, () => { window.tomato.sendApplicationStatus(this.state) });
        this.loadingTimerStart();
    }
    onLoadingTimerFinished(){
        let nextState = { status: 'run', currentSeconds: 0, showHarvest: false };
        if(this.state.mode == 'work'){
            /***
             *  집중시간 타이머가 종료되었으므로 5초 후 휴식시간 타이머 시작
             */
            nextState.mode = 'break';
        } else if(this.state.mode == 'break') {
            /***
             *  휴식시간 타이머가 종료되었으므로 5초 후 집중시간 타이머 시작
             */
            nextState.mode = 'work';
        }

        this.loadingTimerStop();
        this.setState(nextState, () => { window.tomato.sendApplicationStatus(this.state) });
        this.timerResume();

        if(nextState.mode == 'work'){
            window.tomato.invokeNotification('【 집중시간 】 타이머 시작', '집중하여 최고의 업무효율에 도전하고 토마토를 획득하세요!', 'pomodoro_normal.png', true);
        } else {
            window.tomato.invokeNotification('【 쉬는시간 】 타이머 시작', '쉬는시간 동안 다음 집중을 위해 머리도 식히고 스트레칭도 해보세요!', 'pomodoro_normal.png', true);
        }
    }

    increaseCurrentSeconds(){
        const n = this.state.currentSeconds + 1;
        this.setState({ currentSeconds: n });

        if(this.state.status == 'run') {
            if(this.state.mode == 'break' && this.state.relaxLimitSeconds - n == 60){
                window.tomato.invokeNotification('쉬는시간 종료 임박', '쉬는시간 종료까지 1분 남았습니다. 정리하세요!');
            }

            if(
                ( this.state.mode == 'work' && n >= this.state.workLimitSeconds ) ||
                ( this.state.mode == 'break' && n >= this.state.relaxLimitSeconds )
            ) {
                this.onTimerFinished();
            }
        } else if(this.state.status == 'loading' && n >= this.loading_timer.limit) {
            this.onLoadingTimerFinished();
        }
    }
    increaseWorkLimitSeconds(){
        if(this.state.workLimitSeconds >= 3600) return;

        const workLimitSeconds = this.state.workLimitSeconds + 60;
        this.setState({ workLimitSeconds: workLimitSeconds });
        window.tomato.setAsyncStorage({ workLimitSeconds: workLimitSeconds });
    }
    decreaseWorkLimitSeconds(){
        // if(this.state.workLimitSeconds <= 600) return;
        if(this.state.workLimitSeconds <= 60) return;

        const workLimitSeconds = this.state.workLimitSeconds - 60;
        this.setState({ workLimitSeconds: workLimitSeconds });
        window.tomato.setAsyncStorage({ workLimitSeconds: workLimitSeconds });
    }
    increaseRelaxLimitSeconds(){
        if(this.state.relaxLimitSeconds >= 1800) return;

        const relaxLimitSeconds = this.state.relaxLimitSeconds + 60;
        this.setState({ relaxLimitSeconds: relaxLimitSeconds });
        window.tomato.setAsyncStorage({ relaxLimitSeconds: relaxLimitSeconds });
    }
    decreaseRelaxLimitSeconds(){
        // if(this.state.relaxLimitSeconds <= 180) return;
        if(this.state.relaxLimitSeconds <= 60) return;

        const relaxLimitSeconds = this.state.relaxLimitSeconds - 60;
        this.setState({ relaxLimitSeconds: relaxLimitSeconds });
        window.tomato.setAsyncStorage({ relaxLimitSeconds: relaxLimitSeconds });
    }

    addBlockSite(e){
        let list = this.state.blockedSiteList.slice();
        list.push(e);

        this.setState({ blockedSiteList: list });
        window.tomato.setAsyncStorage({ siteList: JSON.stringify(list) });
    }
    removeBlockSite(e){
        let list = this.state.blockedSiteList.slice(),
            index = list.indexOf(e);

        if (index > -1) { list.splice(index, 1); }

        this.setState({ blockedSiteList: list });
        window.tomato.setAsyncStorage({ siteList: JSON.stringify(list) });
    }

    timerResume(){
        this.recurring_timer.start = new Date();
        this.recurring_timer.timerId = window.setTimeout(() => {
            this.recurring_timer.remaining = this.recurring_timer.delay;
            this.timerResume();
            this.increaseCurrentSeconds();
        }, this.recurring_timer.remaining);
    }
    timerPause(){
        window.clearTimeout(this.recurring_timer.timerId);
        this.recurring_timer.remaining -= new Date() - this.recurring_timer.start;
    }
    timerStop(){
        window.clearTimeout(this.recurring_timer.timerId);
        this.recurring_timer.remaining = 0;
    }

    loadingTimerStart(){
        this.loading_timer.timerId = window.setTimeout(() => {
            this.loadingTimerStart();
            this.increaseCurrentSeconds();
        }, this.loading_timer.delay);
    }
    loadingTimerStop(){
        window.clearTimeout(this.loading_timer.timerId);
        this.loading_timer.timerId = 0;
    }

    rewardTomato(e){
        if(this.state.isRewarded !== false) return false;
        if(this.state.todayTomatoList.length >= 8) return false;

        let totalTomato = this.state.totalTomato,
            totalStar = this.state.totalStar,
            todayTomatoList = this.state.todayTomatoList.slice();
        if(this.state.isFresh === true && e === undefined) {
            totalTomato += 1;
            todayTomatoList.push('fresh');

            if(totalTomato == 6)
                totalStar += 1;
        } else {
            todayTomatoList.push('rotten');
        }

        this.setState({
            totalTomato: totalTomato,
            totalStar: totalStar,
            todayTomatoList: todayTomatoList,
            isRewarded: true
        });

        window.tomato.setAsyncStorage({
            totalTomato: totalTomato,
            totalStar: totalStar,
            todayTomato: JSON.stringify(todayTomatoList)
        });

        return true;
    }
    makeTomatoRotten(message){
        if(this.state.isFresh === false || this.state.mode != 'work' || this.state.status != 'run')
            return;

        this.rewardTomato(true);
        this.setState({ isFresh: false, isRewarded: true })
        window.tomato.invokeNotification('토마토가 시들었어요 ㅠㅠ', message, 'pomodoro_rotten.png', true);
    }
}

App.defaultProps = {
    environment: {}
};

export default App;