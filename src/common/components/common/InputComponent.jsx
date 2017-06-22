import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input, Form, Label} from 'semantic-ui-react'
import {omit} from 'lodash'

//
export default class InputComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  static propTypes = {
    validate: PropTypes.func,
    connectToParent: PropTypes.func,
    value: PropTypes.any,
    error: PropTypes.string,
    labelText: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    as: PropTypes.node,
    action: PropTypes.any
  }

  handleChange (event) {
    let state = {
      value: event.target.value
    }
    let {validate, name} = this.props
    if (validate) {
      state.error = validate(state.value, name) // if valid, then false!
      this.props.connectToParent({name, ...state})
    }
    this.setState(state)
  }

  // We have similar code in `handleChange()`
  componentWillMount () {
    let {validate, value, name} = this.props
    let error
    if (validate) {
      error = validate(value, name)
    }

    this.setState({...this.state, error, value})
  }

  componentWillReceiveProps () {
    // PROPS ERROR TO STATE ERROR
    let {error} = this.props
    if (error && error[0]) {
      this.setState({
        error: error || null
      })
    }
  }

  render () {
    // STATE ERROR
    const {error, value} = this.state
    const {as} = this.props
    // prop `as`
    const propsToOmit = ['validate', 'error', 'connectToParent', 'as']

    let propsForInput = {
      ...this.props,
      onChange: this.handleChange.bind(this),
      value
    }

    let RenderComponentAsProp
    let propAsElemExists = false

    if (as) {
      propAsElemExists = true
      RenderComponentAsProp = as
    }

    let propsForField
    if (error) {
      propsForField = {error: true}
    }
    propsForInput = omit(propsForInput, propsToOmit)

    // labelText(custom) - is a TEXT label
    // label - is a BUTTON label
    // check semantic-react docs
    let labelTextComponent = null
    if (propsForInput.labelText) {
      labelTextComponent = <label htmlFor="">{propsForInput.labelText}</label>
      delete propsForInput.labelText
    }

    return (
      // in semantic if input is a part of form, we can make it error-visible
      // only throught the Form.Field error
      (
        <Form.Field {...propsForField}>
          {labelTextComponent}

          {propAsElemExists
            ? <RenderComponentAsProp {...propsForInput} />
            : <Input {...propsForInput} />}

          {/* display tooltip with error */}
          {error && <Label basic color="red" pointing>{error}</Label>}
        </Form.Field>
      )
    )
  }
}
