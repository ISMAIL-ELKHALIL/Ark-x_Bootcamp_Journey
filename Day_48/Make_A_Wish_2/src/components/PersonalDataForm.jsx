import { Component } from "react";
class PersonalDataForm extends Component {
  render() {
    return (
      <section>
        <h2>Heroes need to be recognized</h2>
        <form>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" />
          <br />
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" />
          <br />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
          <br />
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" />
        </form>
      </section>
    );
  }
}

export default PersonalDataForm;
