import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateTabList } from '../ducks/reducer';
import axios from 'axios';

import './SearchPage.css';

class SearchPage extends Component {
    constructor() {
        super();

        this.state = {
            band: '',
            song: '',
            searchCategory: 'band'
        }
        this.getTabsByBand = this.getTabsByBand.bind(this);
        this.getTabsBySong = this.getTabsBySong.bind(this);
    }

    getTabsByBand(band) {
        axios.get(`http://localhost:3030/api/bandSearch?bandName=${this.state.band}`)
            .then((response) => {
                this.props.updateTabList(response.data);
            })
    }

    getTabsBySong(song) {
        axios.get(`http://localhost:3030/api/songSearch?songName=${this.state.song}`)
            .then((response) => {
                this.props.updateTabList(response.data);
            })
    }

    render() {
        return (
            <div className='background_container'>
                <div className='topnav'>
                    <a href='/'>TabSlam</a>
                    <a href='/auth/login'>Login</a>
                </div>
                <div className='search_container'>
                    <select onChange={(event) => this.setState({
                        searchCategory: event.target.value, song: '', band: ''
                    })}>
                        <option value='band'>Band</option>
                        <option value='song'>Song</option>
                    </select>
                    <input value={this.state.searchCategory === 'band' ? this.state.band : this.state.song}
                        placeholder='Search for a tab'
                        onChange={this.state.searchCategory === 'band' ? (event) => this.setState({ band: event.target.value })
                            : (event) => this.setState({ song: event.target.value })} />
                    <Link to='/search-results'>
                        <button onClick={() => this.state.searchCategory === 'band' ?
                            this.getTabsByBand(this.state.band) : this.getTabsBySong(this.state.song)}>Search</button>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { updateTabList })(SearchPage);