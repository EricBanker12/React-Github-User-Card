import React from 'react'
import axios from 'axios'
import './App.css'

import Card from './components/Card'

class App extends React.Component {
    state = {
        userName: 'ericbanker12',
        userData: {},
        userFollowers: [],
    }

    componentDidMount() {
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp => {
                this.setState({
                    userData: resp.data
                })
            })
            .catch(console.error)
    }

    render() {
        return (
            <div className="App">
                <Card {...this.state.userData} />
            </div>
        );
    }
}

export default App
