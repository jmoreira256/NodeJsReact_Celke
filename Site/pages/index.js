import React, { useState } from 'react';
import { Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Jumbotron,
    Form, 
    FormGroup,
    Label, 
    Input,
    Button,
    Alert} from 'reactstrap';

function HomePage(){
    const [budget, setBudget] = useState({
        name:'',
        email:'',
        phone:'',
        message:'',
    });

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const onChangeInput = e => setBudget({ ...budget, [e.target.name]: e.target.value});

    const sendBudget = async e => {
        e.preventDefault();
        setResponse({formSave: true});

        try{
            const res = await fetch('http://localhost:8080/budget', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(budget)
            });

            const responseEnv = await res.json();
            
            if(responseEnv.error){
                setResponse({
                    formSave: false,
                    type: 'Error',
                    message: responseEnv.message
                });
            }
            else{
                setResponse({
                    formSave: false,
                    type: 'Success',
                    message: responseEnv.message
                });
            }
        } catch(err){
            setResponse({
                formSave: false,
                type: 'Error',
                message: 'There was a problem connecting with the API' +err
            });
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return <div>
      <Navbar color="info" dark expand="md">
        <Container>
        <NavbarBrand href="/">Budget System</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Budget</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        </Container>
      </Navbar>

      <Jumbotron className="pg-budget">
        <style>
            {`.pg-budget{
                background-color: #F5FBFA;
                color: #17A2B8;
                padding-top:50px;
                padding-bottom:100px;
                margin-bottonm:0rem !important;
            }`}
        </style>
        <Container>
        <h1 className="display-4 text-center">Our advisors are ready to help you</h1>
        <p className="lead text-center mb-4">Leave your contact info in the forms below, and we will give you a solution for your needs</p>

        {response.type==='Error' ? <Alert color="danger">{response.message}</Alert> : ""}
        {response.type==='Success' ? <Alert color="success">{response.message}</Alert> : ""}

        <Form onSubmit={sendBudget}>
        <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Please, put your full name" onChange={onChangeInput}/>
        </FormGroup>
        <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Please, put your email" onChange={onChangeInput} />
        </FormGroup>
        <FormGroup>
            <Label for="phone">Phone</Label>
            <Input type="text" name="phone" id="phone" placeholder="Please, put your phone number" onChange={onChangeInput} />
        </FormGroup>
        <FormGroup>
            <Label for="message">Message</Label>
            <Input type="text" name="message" id="message" placeholder="Please, tell us about your necessity" onChange={onChangeInput}/>
        </FormGroup>
        {response.formSave ? 
        <Button type="submit" outline color="info" disabled>Sending...</Button> : <Button type="submit" outline color="info" >Submit</Button>
        }
        </Form>
    </Container>
    </Jumbotron>

    <Jumbotron fluid className="footer bg-info">
        <style>
            {`.footer{
                color: #FFF;
                padding-top:10px;
                padding-bottom:10px;
                margin-bottom: Orem ! important;
            }`}
        </style>
        <Container>
            <h1 className="lead text-center">Footer</h1>
        </Container>
    </Jumbotron>

    </div>
}

export default HomePage;