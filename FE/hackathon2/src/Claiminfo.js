import React, { Component } from 'react';

class Claiminfo extends Component {
    render() {
        const{id, claim, from} = this.props.info;
        return (
            <div>
                <div>{id}</div>
                <div>{claim}</div>
                <div>{from}</div>
            </div>
        );
    }
}

export default Claiminfo;