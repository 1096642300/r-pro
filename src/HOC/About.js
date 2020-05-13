import React, { Component } from 'react'
import WithCopy from "./WithCopy"
@WithCopy
 class About extends Component {
    render() {
        return (
            <div>
                frafa{this.props.num}
            </div>
        )
    }
}
export default About
