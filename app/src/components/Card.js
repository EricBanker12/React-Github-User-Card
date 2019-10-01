import React from 'react'

function Card(props) {
    return (
        <div className="row">
            <div className="col m2"></div>
            <div className="col s12 m8 card horizontal">
                <div className="card-image">
                    <img src={props.avatar_url} alt={props.name} />
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <span className="card-title">{props.name || props.login}</span>
                        <p>{props.login}</p>
                        <p>Location: {props.location || 'N.A.'}</p>
                        <p>Followers: {props.followers}</p>
                        <p>Following: {props.following}</p>
                        <p>Bio: {props.bio || 'N.A.'}</p>
                    </div>
                    <div className="card-action center-align">
                        <a href={props.html_url}>Profile</a>
                        {props.blog?<a href={props.blog}>Website</a>:''}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card