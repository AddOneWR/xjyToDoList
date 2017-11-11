import React, { Component } from 'react';
import '../css/topBar.css'

class TopBar extends Component {
    constructor(){
        super();
        this.state = {
            search: ''
        }
    }
    handleSearch(e){
        this.setState({
            search: e.target.value
        })
    }
    render(){
        return(         
            <div className="navbar-form row navbar-default"  role="search">
                <div className="col-md-4 col-md-offset-3">
                    <input type="text" className="form-control" placeholder="快速查找"  value={this.state.search} onChange={this.handleSearch.bind(this)}/>
                </div>                    
            </div>
        );
    }
}

export default TopBar;