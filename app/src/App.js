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

    componentDidUpdate(prevProps, prevState) {
        // if different user, get followers
        if (this.state.userData.followers_url && (!prevState.userData.followers_url || prevState.userData.followers_url !== this.state.userData.followers_url)) {
            // clear previous user followers
            this.setState({
                userFollowers: []
            })
            // get followers
            axios.get(this.state.userData.followers_url)
                .then(resp => {
                    resp.data.slice(0,3).forEach(follower => {
                        // get follower's data
                        axios.get(`https://api.github.com/users/${follower.login}`)
                            .then(resp => {
                                this.setState({
                                    userFollowers: [...this.state.userFollowers, resp.data]
                                })
                            })
                            .catch(console.error)
                    })
                })
                .catch(console.error)
        }
    }

    render() {
        return (
            <div className="App">
                <Card {...this.state.userData} />
                {this.state.userFollowers.map(follower => <Card {...follower} />)}
            </div>
        );
    }
}

export default App
