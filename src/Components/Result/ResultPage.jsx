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
                        <div className="card card-fluid p-3">
                            <div className="row mb-2">
                                <div className="col-md-12">
                                    <Search />
                                </div>
                            </div>
                            <div className="row ml-3">
                                <div className="col-md-12">
                                <div className="card card-fluid p-3">
                                    <div className="card-header">
                                        <div className="float-left">Cabins</div>
                                        <div className="float-right">
                                            <div class="dropdown show">Sortby : Relevance
                                                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <div class="dropdown-item" href="#">Action</div>
                                                    <div class="dropdown-item" href="#">Another action</div>
                                                    <div class="dropdown-item" href="#">Something else here</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body card-fluid">
                                        <div className="row">
                                            <div className="col-md-12" style={{ maxHeight: "800px", overflow: "auto" }}>
                                                <ResultCard />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                    
                        {/* <img className="img img-fluid"  src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/SS2.max-1000x1000.png" alt=""/> */}

                    
                    </div>
                </div>
            </div>
        )
    }
}