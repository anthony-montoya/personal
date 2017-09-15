import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TabResults.css';

//Class that renders the actual tablature.
class TabResults extends Component {
    render() {
        return(
            <div>
                <pre className='tab_content'>
                    { this.props.tabContent } 
                </pre>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tabContent: state.tabContent
    }
}

export default connect(mapStateToProps)(TabResults);