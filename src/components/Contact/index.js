import React from "react"
import Card from '../Card'
import "./Contact.css"



const Contact = (props) => {
    return <Card id={"Contact"}>
    <a id='#Contact' ></a>
    <div id='contact-content-container'>
        <h1 id="contact-form-header">Get In Touch</h1>
        <form id="contact-form" action='/#/' method="GET" rel='noopener noreferrer'  >
            
            <div id={"name-group"}>
                <label id="contact-label" htmlFor='contact-name'>Name:</label>
                <input id='contact-name' type='text' placeholder='Full Name' name='name' />
            </div>
            <div id={"email-group"}>
                <label id="email-label" htmlFor='contact-email'>Email:</label>
                <input id='contact-email' type='email' placeholder='Email: abc@123.com' name='email' />
            </div>
            <div id={"subject-group"}>
                <label id="subject-label" htmlFor='contact-subject'></label>
                <input id='contact-subject' type='text' placeholder='Subject' name='subject' />
            </div>
            <div id={"message-group"}>
                <label htmlFor='contact-message' ></label>
                <textarea id='contact-message' placeholder="Your message: 500 characters or less" name="message" />
            </div>
            <input type='submit' ></input>
            
        </form>  
    </div>
    
    </Card>

}

export default Contact;