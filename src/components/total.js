import React from "react";

class Total extends React.Component {
    shouldComponentUpdate(nextProps){
        if(this.props.total != nextProps.total)
            return true;

        return false;
    }
    render(){
        return (
            <div className="tomato-total">
                <div className="count-item">
                    <img src={"images/" + this.props.icon} />
                </div>
                <div className="count-item">
                    <span className="combine">{'×'}</span>
                </div>
                <div className="count-item">
                    <span className="value">{this.props.total}</span>
                </div>
            </div>
        );
    }
}

export default Total;