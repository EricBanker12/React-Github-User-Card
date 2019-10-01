import React from 'react'
import axios from 'axios'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css'

import Card from './components/Card'
import Pagination from './components/Pagination'
import UserInput from './components/UserInput'

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
        if (this.state.userName !== prevState.userName) {
            axios.get(`https://api.github.com/users/${this.state.userName}`)
                .then(resp => {
                    this.setState({
                        userData: resp.data
                    })
                })
                .catch(console.error)
        }
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
                    this.state.userFollowers.slice(0,2).forEach(follower => {
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
            // clear old page data
            this.setState({
                userFollowersData: [],
            })
            this.state.userFollowers.slice(2 * (this.state.page-1), 2 * this.state.page).forEach(follower => {
                // get follower's data
                axios.get(`https://api.github.com/users/${follower}`)
                    .then(resp => {
                        this.setState({
                            userFollowersData: [...this.state.userFollowersData, resp.data]
                        })
                    })
                    .catch(console.error)
                })
        }
    }

    submitHandler = (userName) => {
        this.setState({
            userName
        })
    }

    pageHandler = (pageNumber) => {
        if (0 < pageNumber <= Math.ceil(this.state.userFollowers.length/2)) {
            this.setState({
                page: pageNumber
            })
        }
    }

    render() {
        return (
            <div className="App">
                <UserInput handler={this.submitHandler} />
                <Card {...this.state.userData} />
                <h4>Followers:</h4>
                {this.state.userFollowersData.map(follower => <Card key={follower.id} {...follower} />)}
                <Pagination page={this.state.page} pages={Math.ceil(this.state.userFollowers.length/2)} handler={this.pageHandler} />
            </div>
        );
    }
}

export default App
