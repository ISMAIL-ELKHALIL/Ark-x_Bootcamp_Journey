
import React from "react"


function App() {
  const achievements = ["E-commerce Website", "Restaurant Manager", "Rocket manipulator"]

  function Salutation() {
    return <div>
      <h2>Dear Stephen</h2>
      <br />
      <p>Hi, my name is Ismail, and I would like to introduce myself to you. I am applying for the position of React developer.</p>
      <br />
      <p>I’ve attached my CV to this email.</p>
      <p>You can find details of my previous roles, experience, and achievements.</p>
      <p>I’m particularly proud of :</p>
      <ul id="my-achievements">
        {achievements.map((achievement, index) => {
          return <li key={"achievement" + index}>{achievement}</li>
        })}
      </ul>
      <p>I’m excited about this opportunity and would love to know more about the process, including timelines for you to decide on interviews.</p>
    </div>
  }



  function Signature() {
    return <div>
      <br />
      <span>Best regards,</span>
      <span>React</span>
      <b>{ }</b>
    </div>
  }


  return (
    <div className="App">
      <Salutation />
      <Signature />
    </div>
  );
}

export default App;
