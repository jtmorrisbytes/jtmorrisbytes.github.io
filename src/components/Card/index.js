import React from 'react'
import "./Card.css"

const Card = (props) => {
    return <div id={props.id} className="card">
        {props.children}
    </div>
}

export default Card