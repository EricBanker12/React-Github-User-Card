import React from 'react'

function UserInput(props) {
    const [input, setInput] = React.useState('')

    return (
        <form 
            className="row"
            onSubmit={e=>{
                e.preventDefault()
                props.handler(input)
            }
        }>
            <div className="col m3"></div>
            <div className="row col s12 m6">
                <input type="text" placeholder="Input a Github Username" onChange={e=>{setInput(e.target.value)}} value={input} />
                <button className="btn" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default UserInput