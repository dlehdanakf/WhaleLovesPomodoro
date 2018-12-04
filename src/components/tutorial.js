import React from 'react';
import TimerSetting from './timer.setting';
import Total from './total';
import Harvest from './harvest';

const TutorialStepOne = () => {
    return (
        <div className="content-wrap">
            <span><img src={'images/pomodoro_basket_small.png'} style={{height: 100}} /></span>
            <span style={{marginTop: 12}}>
                <span className="tutorial-total">
                    <Total icon={"pomodoro_normal.png"} total={391} />
                    <Total icon={"star.png"} total={23} />
                </span>
            </span>
            <p className="description">정해진 시간동안 집중하여<br/>업무효율을 높히고 토마토를 획득하세요!</p>
        </div>
    );
}
const TutorialStepTwo = () => {
    return (
        <div className="content-wrap">
            <span className="tutorial-rotten"><img src={'images/pomodoro_rotten.png'} style={{height: 80}} /></span>
            <p className="description">토마토가 시들지 않도록<br/>집중시간에는 업무에 집중하세요!</p>
            <p className="sub-description">타이머 초기화, 업무방해 사이트 접속, 자리비움이<br/>감지될 경우 온전한 토마토를 획득하실 수 없습니다.</p>
        </div>
    );
}
const TutorialStepThree = () => {
    return (
        <div className="content-wrap">
            <TimerSetting workLimitSeconds={1500} relaxLimitSeconds={300} />
            <p className="description">집중시간과 쉬는시간을<br/>목적에 따라 알맞게 조절할 수 있습니다!</p>
        </div>
    );
}
const TutorialStepFour = () => {
    return (
        <div className="content-wrap">
            <div style={{marginBottom: 32}}>
                <Harvest todayTomatoList={['fresh', 'fresh', 'rotten', 'fresh', 'fresh', 'fresh', 'fresh']} />
            </div>
            <p className="description">하루 최대 8번 도전 중 6개의 토마토를<br/>수확하시면 추가 보상도 드려요!</p>
        </div>
    );
}

class Tutorial extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            step: 1
        };

        this.renderTutorialContent = this.renderTutorialContent.bind(this);
        this.renderNextPrevButtons = this.renderNextPrevButtons.bind(this);
        this.onClickNextButton = this.onClickNextButton.bind(this);
        this.onClickPrevButton = this.onClickPrevButton.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextState.step != this.state.step)
            return true;

        return false;
    }
    render(){
        return (
            <div className="section-tutorial">
                <div className="section-table">
                    <div>
                        <div className="tutorial-content">
                            <this.renderTutorialContent />
                            <div className="button-area">
                                <this.renderNextPrevButtons />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-whale">
                    <div className="whale-contest">
                        <span><img src={'images/whale_contest.png'} alt={'whale contest'} /></span>
                        <p>제 1회 웨일 확장앱 콘테스트 출품작입니다</p>
                    </div>
                </div>
            </div>
        );
    }

    renderTutorialContent(){
        switch(this.state.step){
            case 1: return <TutorialStepOne />
            case 2: return <TutorialStepTwo />
            case 3: return <TutorialStepThree />
            case 4: default: return <TutorialStepFour />
        }
    }
    renderNextPrevButtons(){
        if(this.state.step < 2)
            return (
                <div className="rows">
                    <div className="col-100">
                        <button type="button" className="app-button app-button-success" onClick={this.onClickNextButton}>다음</button>
                    </div>
                </div>
            );

        if(this.state.step >= 4)
            return (
                <div className="rows">
                    <div className="col-50">
                        <button type="button" className="app-button" onClick={this.onClickPrevButton}>뒤로</button>
                    </div>
                    <div className="col-50">
                        <button type="button" className="app-button app-button-success" onClick={this.props.onPressStopTutorial}>시작하기</button>
                    </div>
                </div>
            );

        return (
            <div className="rows">
                <div className="col-50">
                    <button type="button" className="app-button" onClick={this.onClickPrevButton}>뒤로</button>
                </div>
                <div className="col-50">
                    <button type="button" className="app-button app-button-success" onClick={this.onClickNextButton}>다음</button>
                </div>
            </div>
        );
    }

    onClickNextButton(){
        this.setState({ step: this.state.step + 1 });
    }
    onClickPrevButton(){
        this.setState({ step: this.state.step - 1 });
    }
}
Tutorial.defaultProps = {
    onPressStopTutorial: ()=>{}
};

export default Tutorial;