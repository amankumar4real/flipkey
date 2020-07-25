import React from 'react'


export class PropertyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        console.log(this.props)
        return (
            <div>
                {this.props}
            </div>
        )

    }
}