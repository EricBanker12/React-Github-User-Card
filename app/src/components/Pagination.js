import React from 'react'

function Pagination(props) {
    const pages = [...Array(props.pages).keys()]
    return (
        <ul className="pagination">
            <li
                className={props.page === 1 ? 'disabled' : 'waves-effect'}
                onClick={()=>{props.handler(props.page+1)}}
            >
                {'<'}
            </li>
            {
                pages.map((i) => {
                    return (
                        <li
                            className={props.page === i+1 ? 'active' : 'waves-effect'}
                            onClick={()=>{props.handler(i+1)}}
                        >
                            {i+1}
                        </li>
                    )
                })
            }
            <li
                className={props.page === props.pages ? 'disabled' : 'waves-effect'}
                onClick={()=>{props.handler(props.page+1)}}
            >
                >
            </li>
        </ul>
    )
}

export default Pagination