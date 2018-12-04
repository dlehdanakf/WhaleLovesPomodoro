import React from 'react';

class Switcher extends React.PureComponent {
    constructor(props){
        super(props);

        let value = this.props.value;
        if(!this.props.value && this.props.labels.length > 0 && this.props.labels[0].value)
            value = this.props.labels[0].value;

        this.state = {
            value: value
        };

        this.onClick = this.onClick.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState({ value: nextProps.value });
    }
    render(){
        return (
            <div className="app-switch">
                {this.props.labels.map(v => {
                    const className = v.value === this.state.value ? 'active' : null;

                    return (
                        <a
                            key={v.value}
                            className={className}
                            disabled={this.props.disabled}
                            onClick={() => this.onClick(v)}
                        >
                            <span>{v.label}</span>
                        </a>
                    );
                })}
            </div>
        );
    }

    onClick(v){
        if(this.state.value == v.value || this.props.disabled) return;
        this.props.onChange(v.value);
    }
}
Switcher.defaultProps = {
    labels: [],
    value: null,
    disabled: false,
    onChange: ()=>{}
};

export default Switcher;