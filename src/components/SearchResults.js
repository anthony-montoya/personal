import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearTabs, renderTabResults } from '../ducks/reducer';

class SearchResults extends Component {
    //THIS CURRENTLY HAS THE URL FOR THE TAB THE USER WANTS
    getContentText(tabObj) {
        var tabUrl = tabObj.url;
        var tabDifficulty = tabObj.difficulty;

        axios.get(`http://localhost:3030/api/tabContent?tabUrl=${tabUrl}&tabDifficulty=${tabDifficulty}`)
            .then((response) => {
                if (response.data.tab_content)
                    this.props.renderTabResults(response.data.tab_content);
                else
                    this.props.renderTabResults(response.data);
            })
    }

    render() {
        //Filters through the tablist object and sorts the search results according to the unordered list.
        const filteredTabList = this.props.tabList.map((tab, i) => {
            if (!tab.type.includes('pro') && !tab.type.includes('official')) {
                return <ul key={i} >
                    <h4>{tab.url}</h4>
                    <h4>{tab.name}</h4>
                    <h4>{tab.difficulty}</h4>
                    <h4>{tab.type}</h4>
                    <h4>{tab.artist}</h4>
                    <Link to='/tab-results'>
                        <button onClick={() => this.getContentText(this.props.tabList[i])}>Get Tab</button>
                    </Link>
                    <br />
                </ul>
            }
        })
        
        return (
            <div>
                <h1>RESULTS</h1>
                { filteredTabList }
                <Link to='/'>
                    <button onClick={() => this.props.clearTabs()}>Go Back</button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tabList: state.tabList
    }
}

export default connect(mapStateToProps, { clearTabs, renderTabResults })(SearchResults);