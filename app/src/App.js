import React from 'react'
import axios from 'axios'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css'

import Card from './components/Card'

class App extends React.Component {
    state = {
        userName: 'ericbanker12',
        userData: {},
        userFollowers: [],
        userFollowersData: [],
        page: 1,
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
        console.log('componentDidUpdate')
        // if different user, get followers
        if (this.state.userData.followers_url && (!prevState.userData.followers_url || prevState.userData.followers_url !== this.state.userData.followers_url)) {
            console.log('new user')
            // clear previous user followers
            this.setState({
                userFollowers: [],
                userFollowersData: [],
                page: 1,
            })
            // get followers
            axios.get(this.state.userData.followers_url)
                .then(resp => {
                    this.setState({
                        userFollowers: resp.data.map(e => e.login)
                    })
                    this.state.userFollowers.slice(0,3).forEach(follower => {
                        // get follower's data
                        axios.get(`https://api.github.com/users/${follower}`)
                            .then(resp => {
                                this.setState({
                                    userFollowersData: [...this.state.userFollowersData, resp.data]
                                })
                            })
                            .catch(console.error)
                    })
                })
                .catch(console.error)
        }
        else if (this.state.page !== prevState.page && this.state.userFollowers[0] && this.state.userFollowersData[0]) {
            console.log('new page')
            // do stuff
        }
    }

    render() {
        return (
            <div className="App">
                <Card {...this.state.userData} />
                <h4>Followers:</h4>
                {this.state.userFollowersData.map(follower => <Card key={follower.id} {...follower} />)}
            </div>
        );
    }
}

export default App
