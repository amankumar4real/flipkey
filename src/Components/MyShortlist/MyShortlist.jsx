import React from 'react'
import Search from '../common/Search'
import ResultCard from '../common/ResultCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export class MyShortlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <FontAwesomeIcon 
                    icon={["fas", 'heart']} 
                    style={{color:'#f7acbc'}}
                />
            </div>
        )
    }
}