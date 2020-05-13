import React, { Component } from 'react'

const  withCopy  = (Comp)=>{
    return class WithCopy extends Component{
        reabe(){
            console.log()
        }
        render(){
            return (
                <div>
                    <Comp {...this.props}/>
                    {this.reabe()}
                    &copy;千峰
                </div>
            )
        }
    }
}

export default withCopy