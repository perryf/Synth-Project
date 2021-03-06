import React, { Component } from 'react'
import update from 'immutability-helper'
import './Sound.css'

class Distortion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      distortion: this.props.distortion
    }
  }

  changeDist(slider) {
    let newDistAmt = slider.target.value * 0.08
    let newDistortion = update(this.state.distortion, {bits: {$set: newDistAmt}})
    this.setState({
      distortion: newDistortion
    })
  }

  changeWet(slider) {
    let newWetAmt = slider.target.value * 0.01
    let newDistortion = update(this.state.distortion, {wet: {value: {$set: newWetAmt}}})
    this.setState({
      distortion: newDistortion
    })
  }

  render() {
    let distAmt = (
      <input type="range" className="slider reverse" onInput={(e) => this.changeDist(e)}/>
    )
    let wetAmt = (
      <input type="range" className="slider" defaultValue="0" onInput={(e) => this.changeWet(e)}/>
    )
    return(
      <div className="effects-box distortion">
        <h3 className="effects-heading">Distortion</h3>
        <div>
          <p className="effects-label">Amount: </p>
          {distAmt}
        </div>
        <div>
          <p className="effects-label">Dry / Wet: </p>
          {wetAmt}
        </div>
      </div>
    )
  }
}

export default Distortion
