import React from 'react';

class Ticker extends React.Component {
    shouldComponentUpdate(nextProps){
        if(
            nextProps.index !== this.props.index ||
            nextProps.isTall !== this.props.isTall ||
            nextProps.text !== this.props.text
        )
            return true;

        return false;
    }
    render(){
        const className = this.props.isTall ? 'ticker tall' : 'ticker';
        const text = this.props.isTall || this.props.index === 0 ? this.props.text : null;

        return (
            <span className={className}>
                <span>{text}</span>
            </span>
        );
    }
}
Ticker.defaultProps = {
    index: 0,
    isTall: false,
    text: null
};

class TimerGraduation extends React.PureComponent {
    render(){
        const calculated = parseInt(this.props.limitSeconds / 60);
        const minutes = Array(calculated).fill(0);
        let movement = (['run', 'pause']).includes(this.props.status) ? this.props.currentSeconds * 0.8 * -1 : 0;

        return (
            <div className="timer-graduation">
                <div className="ticker-rows" style={{marginLeft: movement}}>
                    {minutes.map((v, i) => {
                        const j = minutes.length - i;
                        const tall = j % 5 === 0;
                        return (
                            <Ticker
                                key={i}
                                index={i}
                                isTall={tall}
                                text={j}
                            />
                        );
                    })}
                    <Ticker isTall={true} text={0} />
                </div>
            </div>
        );
    }
}
TimerGraduation.defaultProps = {
    limitSeconds: 0,
    currentSeconds: 0
};

export default TimerGraduation;
