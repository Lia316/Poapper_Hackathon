import React, { Component } from 'react';
import axios from 'axios';

class Claim extends Component {
    state = {
        roomnumber: '',
        description: '',
        submitted: 0,
        error : 0
    }
    re_submit = () =>{
         this.setState({
           submitted: 0,
       })
    }
    already_submit = ()=>{
        //$.ajax
        if(this.state.roomnumber === ''){
            this.setState({
                error : 1,
                roomnumber : '',
                description : ''

            })
        }
        else if(this.state.description === ''){
            this.setState({
                error : 2,
                roomnumber : '',
                description : ''
            })
        }
        else{
            axios.post('url', {
                roomnumber: this.state.roomnumber,
                description : this.state.description
            })
            .then((response)=>{
                this.setState({
                    roomnumber : '',
                    description : '',
                    submitted: 1
                })
            })
            }
    }
    dsptchange = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    numchange = (e) => {
        const curValue = e.target.value
        const newValue = curValue.replace(/[^0-9]/g, '')
        this.setState({
            roomnumber: newValue
        })
    }


    render() {
        return (
            <div>
                    <form>
                        {this.state.submitted === 0 &&<div>호수를 입력하세요</div>}
                        {this.state.submitted === 0 &&<input type = 'number' value = {this.state.roomnumber} onChange = {this.numchange} />}
                        {this.state.submitted === 0 &&<div>민원 내용을 입력하세요</div>}
                        {this.state.submitted === 0 &&<textarea rows = "5" cols = "50" value = {this.state.description} onChange = {this.dsptchange} />}
                        {this.state.error === 1 && <div>호수를 다시 입력하세요!</div>}
                        {this.state.error === 2 && <div>민원 내용을 다시 입력하세요!</div>}
                        {this.state.submitted === 0 &&<div><button type = 'button' onClick = {this.already_submit}>전송</button></div>}
                        {this.state.submitted === 1 && <div>민원이 성공적으로 접수되었습니다!</div>}
                        {this.state.submitted === 1 && <button onClick = {this.re_submit}>다른 민원 제출</button>}
                    </form>
            </div>
        );
    }
}

export default Claim;