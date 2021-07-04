import React, { useState, useEffect } from 'react';
import { Form, Col, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

export default function Login({ isLogeedIn, setIsLogeedIn }) {
    const [user, setUser] = useState({});

    const history = useHistory();

    useEffect(() => {
        if (isLogeedIn)
            history.push('/Categories')
    }, [history, isLogeedIn])

    function handelSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:3002/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (!data.isAuth) {
                    setIsLogeedIn(false);
                    return setUser({ ...user, auth: <div style={{ color: 'red', float: 'right' }}>שם משתמש או סיסמה שגויים</div> });
                }
                setUser({ ...user, auth: <div style={{ color: 'green', float: 'right' }}>התחברת בהצלחה</div> });
                setIsLogeedIn(true);
                localStorage.setItem('auth', JSON.stringify({
                    isAuth: data.isAuth,
                    isAdmin: data.data[0].isAdmin,
                    id: data.data[0].id
                }));
                if (data.data[0].isAdmin === false) { return history.push('/Categories') };
                return history.push('/ManageProduct');
            })
            .catch(err => alert(err))
    }
    return (
        <Card style={{ width: '32rem', margin: 'auto', backgroundColor: "#e9ecef" }}>
            <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: '35px' }}>כניסה</Card.Title>
                <Form dir="rtl" onSubmit={handelSubmit}>
                    <Form.Row >
                        <Form.Group as={Col} md="9" style={{ margin: "auto auto 30px auto" }}>
                            <Form.Label style={{ float: 'right' }}>דואר אלקטרוני</Form.Label>
                            <Form.Control type="email" placeholder='דוא"ל' required
                                onChange={e => setUser({ ...user, email: e.target.value })}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="9" style={{ margin: "auto auto 20px auto" }}>
                            <Form.Label style={{ float: 'right' }}>סיסמה</Form.Label>
                            <Form.Control type="password" placeholder="סיסמה" required
                                onChange={e => setUser({ ...user, password: e.target.value })}
                            />
                            {user.auth}
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit">היכנס</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}