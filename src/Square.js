import React from "react";

export default class Square extends React.Component {
    constructor(props) {
        super(props); // All React component classes that have a constructor should start with a super(props) call.
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button className="square" onClick={() => { console.log('click'); }}>
                { this.props.value }
            </button>
        );
    }
}