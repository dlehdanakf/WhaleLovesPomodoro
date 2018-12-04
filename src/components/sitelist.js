import React from 'react';
import Switcher from './switcher';

class SiteList extends React.PureComponent {
    constructor(props){
        super(props);

        this.onPressSaveButton = this.onPressSaveButton.bind(this);
    }
    render(){
        const disabled = this.props.status !== 'stop';
        const siteMode = [
            { label: 'Blacklist', value: 'Blacklist' },
            { label: 'Whitelist', value: 'Whitelist' }
        ];

        return (
            <div className="app-setting-internet">
                <h3>
                    <span>Internet Setting</span>
                    <span className="switcher">
                        <Switcher
                            labels={siteMode}
                            disabled={disabled}
                            value={this.props.siteMode}
                            onChange={this.props.onChangeSiteMode}
                        />
                    </span>
                </h3>
                <div className="add-site">
                    <div className="add-input">
                        <input
                            ref={'_input'}
                            type="text"
                            className="site-value"
                            placeholder="사이트 URL을 입력하세요"
                            disabled={disabled}
                        />
                    </div>
                    <div className="add-button">
                        <button
                            type="button"
                            className="app-button app-button-small"
                            disabled={disabled}
                            onClick={this.onPressSaveButton}
                        >
                            {'추가'}
                        </button>
                    </div>
                </div>
                <span className="divider"/>
                {this.props.blockedSiteList.length > 0 ?
                    <ul className="site-list">
                        {this.props.blockedSiteList.map(v => {
                            return (
                                <li key={v}>
                                    <span className="site">{v}</span>
                                    <div className="remove-button">
                                        <button
                                            type="button"
                                            className="app-button app-button-small app-button-subtle"
                                            style={{ fontSize: 18, padding: 6 }}
                                            disabled={disabled}
                                            onClick={() => this.props.removeBlockSite(v)}
                                        >
                                            {'×'}
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    :
                    <div className="site-list-empty">
                        <p className="title">등록된 Site URL이 없습니다</p>
                        <p>집중시간에 {this.props.siteMode === 'Blacklist' ? 'BlackList에' : 'WhiteList 외에'} 접근할 경우<br/>접속이 차단되며 토마토가 시들게됩니다</p>
                    </div>
                }
            </div>
        );
    }

    onPressSaveButton(){
        const isUrlValid = (e) => {
            return (e.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) != null;
        }

        if(typeof this.refs._input.value !== "string") { alert('Site URL 입력방식에 문제가 있습니다!'); return; }

        const val = this.refs._input.value.replace(/(^\w+:|^)\/\//, '');
        if(val.length < 1) { alert('Site URL을 입력하세요!'); return; }
        if(isUrlValid(val) === false) { alert('Site URL 형식이 올바르지 않습니다!'); return; }

        for(let i in this.props.blockedSiteList){
            if(this.props.blockedSiteList[i] == val) { alert('이미 등록된 Site URL 입니다.'); return; }
        }

        this.props.addBlockSite(val);
        this.refs._input.value = '';
    }
}
SiteList.defaultProps = {
    blockedSiteList: [],
    siteMode: 'Blacklist',
    addBlockSite: ()=>{},
    removeBlockSite: ()=>{},
    onChangeSiteMode: ()=>{}
};

export default SiteList;