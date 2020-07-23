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
        return (
            <div className="card p-3">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card p-3">
                            <div className="row mb-2">
                                <div className="col-md-12">
                                    <Search />
                                </div>
                            </div>
                            <div className="row ml-3">
                                <div className="card p-3">
                                    <div className="card-header">
                                        <div className="float-left">Cabins</div>
                                        <div className="float-right">
                                            <div class="dropdown show">Sortby : Relevance
                                                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                </button>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a class="dropdown-item" href="#">Action</a>
                                                    <a class="dropdown-item" href="#">Another action</a>
                                                    <a class="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
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
                    <div className="col-md-6">
                       
                    </div>
                </div>
            </div>
        )
    }
}