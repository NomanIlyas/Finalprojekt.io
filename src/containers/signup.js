import { Component } from 'react';
import { Link } from 'react-router-dom';
import { CallumAPI } from '../Api/api'

export default class SignupPageComponents extends Component {

    state = {
        age: 0,
        firstName: '',
        lastName: '',
        address: '',
        gender: '',
        file: null,
        iSubmitted: false,
        error: '',
        email: '',
        password: '',
        confirmpassword:'',
        twitter: '',
        facebook: '',
        instagram: ''
    }

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { iSubmitted, error } = this.state;
        return (
            <div class="signup-form">
                <form action="/examples/actions/confirmation.php" method="post">
                    <h2>SignUp</h2>
                    <p class="hint-text">Signup here</p>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-12 mb-2"><input type="text" onChange={this.handleInputChange} class="form-control" name="firstName" placeholder="First Name" required="required" /></div>
                            <div class="col-md-6 col-12"><input type="text" class="form-control" onChange={this.handleInputChange} name="lastName" placeholder="Last Name" required="required" /></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" name="address" onChange={this.handleInputChange} placeholder="Address" required="required" />
                    </div>
                    <div class="form-group">
                        <input type="number" class="form-control" name="age" onChange={this.handleInputChange} placeholder="Age" required="required" />
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-12 mb-2"><input type="text" onChange={this.handleInputChange} class="form-control" name="twitter" placeholder="Twitter" required="required" /></div>
                            <div class="col-md-6 col-12"><input type="text" class="form-control" onChange={this.handleInputChange} name="instagram" placeholder="Instagram" required="required" /></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-12 mb-2"><input type="text" onChange={this.handleInputChange} class="form-control" name="facebook" placeholder="Facebook" required="required" /></div>
                            <div class="col-md-6 col-12"><input type="text" class="form-control" onChange={this.handleInputChange} name="email" placeholder="Email" required="required" /></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-12 mb-2"><input type="password" onChange={this.handleInputChange} class="form-control" name="password" placeholder="Password" required="required" /></div>
                            <div class="col-md-6 col-12"><input type="password" class="form-control" onChange={this.handleInputChange} name="confirmpassword" placeholder="Confirm Password" required="required" /></div>
                        </div>
                    </div>
                    <div class="form-group" onChange={this.onGenderChange}>
                        <label className="mr-3">Gender</label>
                        <label class="mr-3 radio-inline">
                            <input className="mr-2" type="radio" value="male" name="gender" />Male
    </label>
                        <label class="radio-inline">
                            <input className="mr-2" type="radio" value="female" name="gender" />Female
    </label>
                    </div>
                    <div className="form-group d-flex justify-content-between">
                        <label>Add Image</label>
                        <input type="file" onChange={this.fileChange} />
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success btn-lg btn-block" onClick={this.handleSubmit}>
                            {iSubmitted ? (<i style={{ 'color': 'white' }} class="fas fa-circle-notch fa-spin"></i>) : ''}
                            Add Now</button>
                    </div>
                    <div className="text-danger">{error}</div>
                </form>

            </div>)

    }

    fileChange = ($event) => {
        this.setState({ file: $event.target.files[0] })
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.ValidateEmail(this.state.email))
        { if(this.validatePassword(this.state.password,this.state.confirmpassword)) {
            this.setState({ iSubmitted: true });
            CallumAPI.addCelebrity(this.state).then(celebrity => {
                this.setState({ iSubmitted: false, error: '' });
                this.props.history.push('/login')
            }).catch(err => { this.setState({ error: 'Something Went Wrong', iSubmitted: false }) })
        }
        }
    }

    ValidateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    validatePassword(pass1,pass2) {
        if(pass1 !== pass2) {
            return false;
        }
        return true;
    }

    handleInputChange(event) {

        var key = event.target.name;
        var value = event.target.value;
        var obj = {};
        obj[key] = value;
        this.setState({ [key]: value });
    }

    onGenderChange = (e) => {
        this.setState({ gender: e.target.value })
    }
}

