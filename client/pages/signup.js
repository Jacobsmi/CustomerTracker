import styles from "../styles/Signup.module.css";

export default function Signup() {

  const processSignUp = async () =>{
    document.getElementById("nameErrors").innerHTML = ""
    document.getElementById("emailErrors").innerHTML = ""
    document.getElementById("passwordErrors").innerHTML = ""
    document.getElementById("confirmErrors").innerHTML = ""

    const name = document.getElementById("signup-name").value
    const validName = /^([a-zA-Z'-.]+ [a-zA-Z'-.]+)$/.test(name)
    if (!validName){
      document.getElementById("nameErrors").innerHTML = "Name not valid"
    }

    const email = document.getElementById('signup-email').value
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<ul>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    if (! validEmail){
      document.getElementById("emailErrors").innerHTML = "E-Mail not valid"
    }

    const pass = document.getElementById('signup-password').value
    const validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[0-9a-zA-Z!@#$%^&*()]{8,}$/.test(pass)
    if (!validPass){
      document.getElementById("passwordErrors").innerHTML = "Invalid Password"
    }

    const confirm = document.getElementById("signup-confirm").value
    const passMatch = (confirm === pass)
    if (!passMatch){
      document.getElementById("confirmErrors").innerHTML = "Passwords do not match"
    }

    if (validName && validEmail && validPass && passMatch){

      const res = await fetch("http://localhost:5000/createuser", {
        method: "POST",
        body: JSON.stringify({
          "name": name,
          "email": email,
          "pass": pass
        })
      })

      const resJson = await res.json()

      console.log(resJson)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formcontainer}>
        <div className={styles.formtitle}>
          Sign Up
        </div>
        <div className={styles.formcontent}>
          <label className={styles.formlabel}>
            Name<br />
            <input type="text" className={styles.forminput} id="signup-name"></input>
            <div className={styles.error} id="nameErrors"></div>
          </label>
          <label className={styles.formlabel}>
            E-Mail<br />
            <input type="text" className={styles.forminput} id="signup-email"></input>
            <div className={styles.error} id="emailErrors"></div>
          </label>
          <label className={styles.formlabel}>
            Password<br />
            <input type="password" className={styles.forminput} id="signup-password"></input>
            <div className={styles.error} id="passwordErrors"></div>
          </label>
          <label className={styles.formlabel}>
            Confirm Password<br />
            <input type="password" className={styles.forminput} id="signup-confirm"></input>
            <div className={styles.error} id="confirmErrors"></div>
          </label>
          <button className={styles.signupbutton} onClick={processSignUp}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}