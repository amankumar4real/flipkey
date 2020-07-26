import React from 'react'
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
                    <div className="col-lg-6 col-md-12">
                        <ResultCard />
                    </div>
                    <div className="col-md-6 d-md-none">
                    
                        {/* <img className="img img-fluid"  src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/SS2.max-1000x1000.png" alt=""/> */}

                    
                    </div>
                </div>
            </div>
        )
    }
}