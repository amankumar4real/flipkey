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
            <div>
                <div className="row m-auto">
                    {/* resultCard */}
                    <div className="col-lg-6 col-md-12">
                        <div className='mx-2'>
                            <ResultCard />
                        </div>
                    </div>
                    {/* Map */}
                    <div className="col-md-6 d-none d-xl-block">
                        <div className='my-2'>
                            <img className="img "  src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/SS2.max-1000x1000.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}