import React from 'react'
import { Field, reduxForm } from 'redux-form'
import FileBase from 'react-file-base64'

import './form.css'

class Form extends React.Component {
    state = { selectedFile: !this.props.selectedFile ? '' : this.props.selectedFile }
    
    renderError({ error, touched })  {
        if (touched && error) {
            return (
                <div className="form__error">{error}
                </div>
            )
        }
    }

    renderInput = ({ label, input, meta }) => {
        const className = `${meta.error && meta.touched ? 'input__error': ''}`
        return (
            <>
                <input {...input} autoComplete='off' placeholder={label} className="form__inputs" className={className} required/>
                <br />
                {this.renderError(meta)}
            </>
        )
    }
    renderInputs = ({ label, input, meta }) => {
        return (
            <>
                <textarea {...input} className="form__textarea" autoComplete='off' placeholder={label} rows="5" cols="55"></textarea>
                <br />
                {this.renderError(meta)}
            </>
        )
    }
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues, this.state.selectedFile)
    }

    render() {
        return (
            <div className="form__container">
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="title" label="Title" component={this.renderInput} autoFocus/>
                    <Field name="message" label="Message" component={this.renderInputs}/>
                    <Field name="tags" label="Tags" component={this.renderInput}/>
                    <FileBase type="file" multiple={false} onDone={({base64}) => this.setState({selectedFile: base64}) } />
                    <button className="form__buttom--submit">Submit</button>
                </form>
            </div>
        )
    }
}

const validate = (formValues) => {
    const error = {}
    if (!formValues.title) {
        error.title =  'You must enter a Title!'
    }
    if (!formValues.message) {
        error.message = 'You must enter a Message!'
    } else if (formValues.message.length > 300) {
        error.message = 'You must enter less than 300 character'
    }
    return error
}


export default reduxForm({
    form: 'postForm',
    validate
})(Form)
