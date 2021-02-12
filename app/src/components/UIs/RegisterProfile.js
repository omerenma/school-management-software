import React, { Component } from "react";
import { connect } from "react-redux";
import { register_profile } from "../../action/userAction";

class RegisterProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      stateOfOrigin: "",
      contactAddress: "",
      phone: "",
      nextOfKin: "",
      nextOfKinAddress: "",
      nextOfKinPhone: "",
      profileImage: null,
      institution: "",
      startDate: "",
      endDate: "",
      certificate: "",
      // certImage: "",
      workExperience: "",
      otherSkills: "",
    };
    this.fileInput = React.createRef();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeProfileImage = (e) => {
    this.setState({ profileImage: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      dateOfBirth: this.state.dateOfBirth,
      stateOfOrigin: this.state.stateOfOrigin,
      contactAddress: this.state.contactAddress,
      phone: this.state.phone,
      nextOfKin: this.state.nextOfKin,
      nextOfKinAddress: this.state.nextOfKinAddress,
      nextOfKinPhone: this.state.nextOfKinPhone,
      profileImage: this.fileInput.current.files[0].name,
      institution: this.state.institution,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      certificate: this.state.certificate,
      // certImage: this.state.certImage,
      workExperience: this.state.workExperience,
      otherSkills: this.state.otherSkills,
    };
    console.log(data.profileImage, "checking image");
    this.props.register_profile(data);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
          <div>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Date of birth"
              name="dateOfBirth"
              value={this.state.dateOfBirth}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="State of origin"
              name="stateOfOrigin"
              value={this.state.stateOfOrigin}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Contact address"
              name="contactAddress"
              value={this.state.contactAddress}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="nextOfKin"
              name="nextOfKin"
              value={this.state.nextOfKin}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Next of kin address"
              name="nextOfKinAddress"
              value={this.state.nextOfKinAddress}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Next of kin phone"
              name="nextOfKinPhone"
              value={this.state.nextOfKinPhone}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="file"
              ref={this.fileInput}
              placeholder="Upload image"
              // name="profileImage"
              // value={this.state.profileImage}
              // onChange={this.onChangeProfileImage}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Institution"
              name="institution"
              value={this.state.institution}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Start date"
              name="startDate"
              value={this.state.stateDate}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="End date"
              name="endDate"
              value={this.state.endDate}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Certificate acquired"
              name="certificate"
              value={this.state.certificate}
              onChange={this.handleChange}
            />
          </div>
          {/* <div>
            <input
              type="file"
              placeholder="Upload certificate"
              name="certImage"
              value={this.state.certImage}
              onChange={this.handleChange}
            />
          </div> */}
          <div>
            <input
              type="text"
              placeholder="Work experience"
              name="workExperience"
              value={this.state.workExperience}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Other skills"
              name="otherSkills"
              value={this.state.otherSkills}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { register_profile })(RegisterProfile);
