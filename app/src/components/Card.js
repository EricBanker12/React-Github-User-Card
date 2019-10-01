import React from 'react'

function Card(props) {
    return (
        <div>
            <img src={props.avatar_url} alt={props.name} />
            <h3>{props.name || props.login}</h3>
            <p>{props.login}</p>
            <p>Location: {props.location || 'N.A.'}</p>
            <p>Profile:&nbsp;
                <a href={props.html_url}>{props.html_url}</a>
            </p>
            <p>Followers: {props.followers}</p>
            <p>Following: {props.following}</p>
            <p>Bio: {props.bio || 'N.A.'}</p>
        </div>
    )
}

export default Card