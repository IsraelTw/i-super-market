import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import './Register.css';
import {domain} from '../../config';

export default function Register() {
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        city: '',
        street: '',
        email: '',
        password: '',
        password2: ''
    });

    const [errors, setErrors] = useState({})

    const [btn, setBtn] = useState({ disabledBtn: true, disabledRegisterBtn: true })
    const [citiesList, setCitiesList] = useState([]);
    const { password, password2, email } = user;


    useEffect(() => {
        if (activeStep === 0) handelDisableNextBtn();
        else if (activeStep === 1) handelDisableRegisterBtn();
        fetch(`${domain}/citiesList`)
            .then(res => res.json())
            .then(data => setCitiesList(data))
            .catch(err => console.log(err))
    }, [user])

    function getSteps() {
        return ['1', '2'];
    }

    function handelChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        validition(e);
    }

    function validition(e) {
        const { name, value } = e.target;

        if (value === '') {
            return setErrors({ ...errors, [name]: 'שדה חובה' });
        }
        else if (name === 'email') {
            if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) === false) {
                return setErrors({ ...errors, [name]: 'דואר אלקטרוני לא תקין' });
            }
            else {
                fetch(`${domain}/email/${value}`)
                    .then(data => data.json())
                    .then(data => {
                        if (data === 'email is already taken') {
                            return setErrors({ ...errors, [name]: 'דואר אלקטרוני קיים במערכת' })
                        }
                    })
                    .catch(err => alert(err))
            }
            return setErrors({ ...errors, email: '' });
        }
        else
            if (name === 'password' && password2 && value !== password2 || name === 'password2' && password && value !== password) {
                return setErrors({ ...errors, [name]: 'הססמאות לא תואמות' });
            }
        setErrors({ ...errors, [name]: '' });
    }

    function handelDisableNextBtn() {
        if (password === '' || password2 === '' || email === '') return setBtn({ ...btn, disabledBtn: true });
        for (const key in errors) {
            if (errors[key] !== '')
                return setBtn({ ...btn, disabledBtn: true });
        };
        setBtn({ ...btn, disabledBtn: false });
    }

    function handelDisableRegisterBtn() {
        for (const key in user) {
            if (user[key] === '') return setBtn({ ...btn, disabledRegisterBtn: true })
        }

        for (const key in errors) {
            if (errors[key] !== '') {
                return setBtn({ ...btn, disabledRegisterBtn: true });
            }
        }

        setBtn({ ...btn, disabledRegisterBtn: false });
    }

    async function register() {
        try {
            let data = await fetch(`${domain}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            data = await data.json();
            if (data === 'All fields are required') return alert('All fields are required');
            return history.push("/");
        }
        catch (err) { console.log(err) }
    }


    const steps = getSteps();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <Form dir="rtl" style={{ marginRight: '20%' }}>

                        <label className="label">דוא"ל</label>
                        <input type="email" className='form-control' placeholder='דוא"ל'
                            name='email'
                            value={user.email}
                            onChange={handelChange}
                        />
                        {errors.email !== '' &&
                            <div className="errors">{errors.email}</div>
                        }

                        <label className="label">סיסמה</label>
                        <input type="password" className='form-control' placeholder="סיסמה"
                            value={user.password}
                            name='password'
                            onChange={handelChange}
                        />
                        {errors.password !== '' &&
                            <div className="errors">{errors.password} </div>
                        }

                        <label className="label">אימות סיסמה</label>
                        <input type="password" className='form-control' placeholder="אימות סיסמה"
                            name='password2'
                            value={user.password2}
                            onChange={handelChange}
                        />
                        {errors.password2 !== '' &&
                            <div className="errors">{errors.password2} </div>
                        }
                        <br />
                        <Button disabled={btn.disabledBtn} variant="contained" color="primary" onClick={handleNext}>
                            הבא
                        </Button>
                    </Form >
                );

            case 1:
                return (
                    <form dir="rtl" style={{ marginRight: '20%' }}>
                        <label className="label">שם פרטי</label>
                        <input type="text" placeholder='שם פרטי' className='form-control'
                            name='firstName'
                            value={user.firstName}
                            onChange={handelChange}
                        />
                        {errors.firstName !== '' &&
                            <div className="errors" >{errors.firstName} </div>
                        }
                        <label className="label">שם משפחה</label>
                        <input
                            type="text" className='form-control'
                            placeholder='שם משפחה'
                            name='lastName'
                            onChange={handelChange}
                            value={user.lastName}
                        />
                        {errors.lastName !== '' &&
                            <div className="errors">{errors.lastName} </div>
                        }

                        <label className="label" >   עיר   </label>
                        <input type="text" className='form-control'
                            list="cities"
                            placeholder='עיר'
                            name='city'
                            onChange={handelChange}
                            value={user.city}
                        />
                        <datalist id="cities" >
                            {citiesList.map(city => {
                                return <option style={{ width: '100px' }}>{city}</option>
                            })}
                        </datalist>



                        {errors.city !== '' &&
                            <div className="errors" >{errors.city} </div>
                        }
                        <label className="label">  רחוב   </label>
                        <input type="text" className='form-control' placeholder='רחוב' value={user.street}
                            name='street'
                            onChange={handelChange}
                        />
                        {errors.street !== '' &&
                            <div className="errors">{errors.street} </div>
                        }
                        <br />
                        <Button hidden={activeStep === 0} onClick={handleBack}>חזור</Button>

                        <Button disabled={btn.disabledRegisterBtn} variant="contained" color="primary" onClick={register}>
                            הרשם
                        </Button>
                    </form>
                );
            default:
                return 'Unknown stepIndex';
        }
    }


    return (
        <div dir='rtl' style={{ width: '60%', margin: 'auto' }}>
            <Stepper activeStep={activeStep} >
                {steps.map((label) => (
                    <Step key={label} >
                        <StepLabel></StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div style={{ float: 'right' }}>{getStepContent(activeStep)}</div>
        </div>
    );
}