import React from 'react'
class Registation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:''
        }
    }
    render(){
        return(
            <div>
                {/*registration page  */}
                <div className=' col-12 border m-2 p-2' style={{width:350}}>
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                            <input 
                                type="name" 
                                className="form-control" 
                                aria-describedby="emailHelp"
                                name='name'
                                placeholder='user name'
                                autoComplete='off' 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                aria-describedby="emailHelp"
                                name='mobile'
                                placeholder='mobile number'
                                autoComplete='off' 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                className="form-control" 
                                name='password'
                                placeholder='Password'
                                autoComplete='off' 
                            />
                        </div>
                        <div className="text-info">
                            {/* <Link to='/forget'> */}
                                <p> Forget password? </p>
                            {/* </Link> */}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                    </form>
                </div> 
            </div>
        )
    }
}
export default Registation