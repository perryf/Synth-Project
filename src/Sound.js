import React, { Component } from 'react'
import update from 'immutability-helper'
import './Sound.css'

class Sound extends Component {
  constructor(props) {
    super(props)
    this.state = {
      synth: this.props.synth
    }
    this.changeWave = this.changeWave.bind(this)
    this.changePartial = this.changePartial.bind(this)
  }
  componentWillMount() {
    let synth = update(this.state.synth, {playing: {$set: false}})
    this.setState({
      synth: synth
    })
  }
  startStop() {
    if (this.state.synth.playing === false) {
      let synth = update(this.state.synth, {playing: {$set: true}})
      this.setState({
        synth: synth
      })
      synth.triggerAttack(synth.oscillator.frequency.value, '+0.05')
    } else {
      let synth = update(this.state.synth, {playing: {$set: false}})
      this.setState({
        synth: synth
      })
      synth.triggerRelease()
    }
  }
  changePitch(input) {
    var pitchText = document.getElementById('pitchText' + this.props.index)
    var pitchSlide = document.getElementById('pitchSlide' + this.props.index)
    if (input.keyCode === 13) {
      let newPitch = input.target.value || 20
      pitchSlide.value = Math.pow(pitchText.value - 100, 1/1.8) || 0
      let synth = update(this.state.synth, {frequency: {value: {$set: newPitch}}})
      this.setState({
        synth: synth
      })
    }
    if (input.type === 'input') {
      let newPitch = Math.pow(input.target.value, 1.8) + 100
      pitchText.value = Math.round(newPitch)
      let synth = update(this.state.synth, {frequency: {value: {$set: newPitch}}})
      this.setState({
        synth: synth
      })
    }
  }
  changeVolume(slider) {
    let newVolume = (slider.target.value * 0.68) - 48
    let synth = update(this.state.synth, {volume: {value: {$set: newVolume}}})
    this.setState({
      synth: synth
    })
  }
  changeWave(newWave) {
    let length = this.state.synth.oscillator.type.length
    let lastChar = this.state.synth.oscillator.type.charAt([length - 1])
    let partial = ''
    if (!Number(lastChar)) {
      partial = ''
    } else {
      partial = lastChar
    }
    newWave = newWave + partial
    let synth = update(this.state.synth, {oscillator: {type: {$set: newWave}}})
    this.setState({
      synth: synth
    })
  }
  handleChangeWave(select) {
    let newWave = select.target.value
    this.changeWave(newWave)
  }
  changePartial(newPartial) {
    let synth = this.state.synth
    let length = synth.oscillator.type.length
    let lastChar = synth.oscillator.type.charAt([length - 1])
    let type = synth.oscillator.type
    if (isNaN(lastChar)) {
    } else {
      type = type.slice(0, - 1)
    }
    synth = update(synth, {oscillator: {type: {$set: type + newPartial}}})

    this.setState({
      synth: synth
    })
  }
  handleChangePartial(select) {
    let newPartial = select.target.value
    this.changePartial(newPartial)
  }

  render() {
    var idSlider = 'pitchSlide' + this.props.index
    var idText = 'pitchText' + this.props.index
    var pitchChanger = <input type="range" id={idSlider} className="slider" defaultValue="24" onInput={(e) => this.changePitch(e)}/>
    var pitchChangerText = <input type="text" id={idText} className="text-box" defaultValue="400" onKeyDown={(e) => this.changePitch(e)} />
    var volumeChanger = <input type="range" className="slider" onInput={(e) => this.changeVolume(e)}/>

    var waveChanger = (
      <select onChange={(e) => this.handleChangeWave(e)}>
        <option value='sine'>Sine</option>
        <option value='square'>Square</option>
        <option value='sawtooth'>Sawtooth</option>
        <option value='triangle'>Triangle</option>
      </select>
    )
    var partialChanger = (
      <select onChange={(e) => this.handleChangePartial(e)}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
      </select>
    )
    return(
      <div className="effects-box">
        <h2 className="synth-heading">Oscillator {this.props.index}</h2>
        <button className="start-stop" onClick={(e) => this.startStop()}>On/Off</button>
        <div>
          <p className="effects-label">Pitch</p>
          {pitchChangerText}
        </div>
        <div>
          {pitchChanger}
        </div>
        <div>
          <p className="effects-label">Volume</p>
          {volumeChanger}
        </div>
        <div className="drop-down">
          <p className="effects-label">Wave Form</p>
          {waveChanger}
        </div>
        <div className="drop-down">
          <p className="effects-label">Partials</p>
          {partialChanger}
        </div>
      </div>
    )
  }
}

export default Sound
