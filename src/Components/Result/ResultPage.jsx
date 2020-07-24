import React from 'react'
import Search from '../common/Search'
import ResultCard from '../common/ResultCard'

export default class ResultPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        console.log(this.props)
        return (
            <div className="card card-fluid p-3">
                <div className="row">
                    <div className="col-md-6">
                        <ResultCard />
                    </div>
                    <div className="col-md-6">
                    
                        {/* <img className="img img-fluid"  src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/SS2.max-1000x1000.png" alt=""/> */}

                    
                    </div>
                </div>
            </div>
        )
    }
}