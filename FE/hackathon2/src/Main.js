import React, { Component } from 'react';
import axios from 'axios';
import './main.css';
import Claim from './Claim';
import ClaiminfoList from './ClaiminfoList';

class Main extends Component {


    state = {
        mode : 0,
        claimlist : []
    }
    goclaim = (e) =>{
        e.preventDefault();
        const {mode} = this.state;
        this.setState({
            mode :0
        })
    }
    seeclaim = (e) =>{
        e.preventDefault();
        axios.get('url')
        .then((Response)=>{
            this.setState({
                claimlist : Response
            })
        }) 
        const {mode} = this.state;
        this.setState({
            mode : 1
        })
    }
    
    render() {
        return (
            <div className = "Main">
            <div>
                <a href = '#' onClick= {this.goclaim}>민원신청하기</a>
                <a href = '#' onClick = {this.seeclaim}>받은 민원 확인하기</a>
            </div>
            <div>
                {this.state.mode === 0 && <Claim />}
                {this.state.mode === 1 && <ClaiminfoList data = {claimlist}/>}
            </div>
            </div>
        );
    }
}

export default Main;