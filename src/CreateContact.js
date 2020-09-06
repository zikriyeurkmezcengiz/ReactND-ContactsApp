import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageInput from "./ImageInput";
import SerializeForm from "form-serialize";

class CreateContact extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const values = SerializeForm(e.target, { hash: true });
    if (this.props.onCreateContact) {
      this.props.onCreateContact(values);
    }
  };
  render() {
    return (
      <div>
        <div>Create Contact</div>
        <div>
          <Link className="close-create-contact" to="/">
            Close
          </Link>
          <form className="create-contact-form" onSubmit={this.handleSubmit}>
            <ImageInput
              className="create-contact-avatar-input"
              name="avatarURL"
              maxHeight={64}
            />
            <div className="create-contact-details">
              <input type="text" name="name" placeholder="Name" />
              <input type="text" name="handle" placeholder="Handle" />
              <button>Add Contact</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateContact;
