import React from 'react';

class Harvest extends React.Component {
    constructor(props){
        super(props);

        this.renderTomatoList = this.renderTomatoList.bind(this);
        this.renderStar = this.renderStar.bind(this);
    }
    shouldComponentUpdate(nextProps){
        if(nextProps.todayTomatoList.length !== this.props.todayTomatoList.length)
            return true;

        return false;
    }
    render(){
        return (
            <div className="section-badge">
                <h3>Today's Pomodoro</h3>
                <this.renderTomatoList />
                <h3>Rewards</h3>
                <this.renderStar />
            </div>
        );
    }
    renderTomatoList(){
        const list = Array(8).fill('null');

        return (
            <div className="rows">
                {list.map((v, i) => {
                    if(i < this.props.todayTomatoList.length) {
                        let imgName = 'pomodoro_normal';

                        if(this.props.todayTomatoList[i] == 'rotten')
                            imgName = 'pomodoro_rotten';

                        return (
                            <div key={i} className="col-10"><img src={"images/" + imgName + ".png"} className="tomato-img" /></div>
                        );
                    }

                    return (
                        <div key={i} className="col-10"><span className="tomato-placeholder"></span></div>
                    );
                })}
            </div>
        );
    }
    renderStar(){
        let tomato = 0, hasStar = false;
        this.props.todayTomatoList.map(v => {
            if(v == 'fresh') { tomato += 1; }
        });
        if(tomato >= 6) hasStar = true;

        return (
            <div className="rows">
                <div className="col-10"><img src={hasStar ? "images/star.png" : "images/star_placeholder.png"} className="tomato-img" /></div>
                <div className="col-90">
                    {
                        hasStar ?
                            <p className="star-description">오늘 하루 집중한 당신에게 <span>STAR</span>를 선물로 드릴게요!</p>
                        :
                            <p className="star-description">하루에 6개의 토마토를 획득하면 <span>STAR</span> 추가보상!</p>
                    }
                </div>
            </div>
        );
    }
}
Harvest.defaultProps = {
    todayTomatoList: []
};

export default Harvest;