import React from 'react';

class TimerSetting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            workLimitSeconds: parseInt(this.props.workLimitSeconds / 60),
            relaxLimitSeconds: parseInt(this.props.relaxLimitSeconds / 60)
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            workLimitSeconds: parseInt(nextProps.workLimitSeconds / 60),
            relaxLimitSeconds: parseInt(nextProps.relaxLimitSeconds / 60)
        });
    }
    shouldComponentUpdate(nextProps, nextState){
        if(
            nextProps.status !== this.props.status ||
            nextState.workLimitSeconds !== this.state.workLimitSeconds ||
            nextState.relaxLimitSeconds !== this.state.relaxLimitSeconds
        )
            return true;

        return false;
    }
    render(){
        const disabled = this.props.status !== 'stop';

        return (
            <div className="app-setting-timer">
                <h3>Timer Setting</h3>
                <div className="rows">
                    <div className="col-50">
                        <div className="rows setting-rows">
                            <div className="col-50">
                                <input
                                    type="text"
                                    value={this.state.workLimitSeconds + ' 분'}
                                    className="timer-value"
                                    disabled={disabled}
                                    readOnly
                                />
                            </div>
                            <div className="col-50">
                                <div className="app-button-group app-button-small">
                                    <button type="button" className="app-button" disabled={disabled} onClick={this.props.increaseWorkLimitSeconds} style={{width: '50%', left: -2}}>▲</button>
                                    <button type="button" className="app-button" disabled={disabled} onClick={this.props.decreaseWorkLimitSeconds} style={{width: '50%'}}>▼</button>
                                </div>
                            </div>
                        </div>
                        <h4 className="setting-description">집중시간</h4>
                    </div>
                    <div className="col-50">
                        <div className="rows setting-rows">
                            <div className="col-50">
                                <input
                                    type="text"
                                    value={this.state.relaxLimitSeconds + ' 분'}
                                    className="timer-value"
                                    disabled={disabled}
                                    readOnly
                                />
                            </div>
                            <div className="col-50">
                                <div className="app-button-group app-button-small">
                                    <button type="button" className="app-button" disabled={disabled} onClick={this.props.increaseRelaxLimitSeconds} style={{width: '50%', left: -2}}>▲</button>
                                    <button type="button" className="app-button" disabled={disabled} onClick={this.props.decreaseRelaxLimitSeconds} style={{width: '50%'}}>▼</button>
                                </div>
                            </div>
                        </div>
                        <h4 className="setting-description">휴식시간</h4>
                    </div>
                </div>
            </div>
        );
    }
}
TimerSetting.defaultProps = {
    status: 'stop',
    workLimitSeconds: 0,
    relaxLimitSeconds: 0,
    increaseWorkLimitSeconds: ()=>{},
    decreaseWorkLimitSeconds: ()=>{},
    increaseRelaxLimitSeconds: ()=>{},
    decreaseRelaxLimitSeconds: ()=>{}
};

export default TimerSetting;