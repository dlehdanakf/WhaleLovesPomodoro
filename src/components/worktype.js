import React from 'react';

import Switcher from './switcher';

class WorkType extends React.PureComponent {
    render(){
        const disabled = this.props.status !== 'stop';
        const workMode = [
            { label: 'Online', value: 'Online' },
            { label: 'Offline', value: 'Offline' }
        ];

        return (
            <div className="app-setting-internet">
                <h3>
                    <span>Working Type Setting</span>
                    <span className="switcher">
                        <Switcher
                            labels={workMode}
                            disabled={disabled}
                            value={this.props.workMode}
                            onChange={this.props.onChangeWorkMode}
                        />
                    </span>
                </h3>
                <p className="work-description">집중시간동안 진행할 업무 유형을 선택하세요.<br/>컴퓨터를 이용한 업무라면 Online을, 아니라면 Offline 선택</p>
            </div>
        );
    }
}
WorkType.defaultProps = {
    status: 'stop',
    workMode: '',
    onChangeWorkMode: ()=>{}
};

export default WorkType;