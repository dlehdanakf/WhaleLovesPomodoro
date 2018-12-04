import React from 'react';
import CountUp from 'react-countup';

import TimerGraduation from './timer.graduation';
import Total from './total';

class Timer extends React.PureComponent {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="app-timer">
                {this.props.showHarvest ?
                    <div className="harvest-information">
                        <div className="title">
                            <p>지금까지 획득한 뽀모 갯수는?</p>
                            <p>총<span className="value"><CountUp end={this.props.totalTomato} duration={3} /></span>개!</p>
                        </div>
                        <div className="thumbnail">
                            <img src="images/pomodoro_basket.png" />
                        </div>
                    </div>
                    :
                    <div>
                        <div style={{overflow: 'hidden', paddingLeft: 16, paddingRight: 16}}>
                            <Total icon={"pomodoro_normal.png"} total={this.props.totalTomato} />
                            <Total icon={"star.png"} total={this.props.totalStar} />
                        </div>
                        <TimerGraduation
                            status={this.props.status}
                            limitSeconds={this.props.limitSeconds}
                            currentSeconds={this.props.currentSeconds}
                        />
                    </div>
                }
                {(()=>{
                    switch(this.props.status){
                        case 'run':
                            return (
                                <div className="timer-buttons">
                                    <button type="button" className="app-button" onClick={() => this.props.onPressTimerConfigureButton('pause')}>일시정지</button>
                                </div>
                            );
                        case 'pause':
                            return (
                                <div className="timer-buttons rows">
                                    <div className="col-60"><button type="button" className="app-button app-button-success" onClick={() => this.props.onPressTimerConfigureButton('run')}>다시시작</button></div>
                                    <div className="col-40"><button type="button" className="app-button" onClick={() => this.props.onPressTimerConfigureButton('stop')}>초기화</button></div>
                                </div>
                            );
                        case 'loading':
                            return (
                                <div className="timer-buttons">
                                    <button type="button" className="app-button" onClick={() => this.props.onPressTimerConfigureButton('stop')}>
                                        {'(0:0' + ( 5 - this.props.currentSeconds ) + ') 취소'}
                                    </button>
                                </div>
                            );
                        case 'stop':
                        default:
                            return (
                                <div className="timer-buttons">
                                    <button type="button" className="app-button app-button-primary" onClick={() => this.props.onPressTimerConfigureButton('run')}>시작</button>
                                </div>
                            );
                    }
                })()}
            </div>
        );
    }
}
Timer.defaultProps = {
    limitSeconds: 0,
    currentSeconds: 0
};

export default Timer;