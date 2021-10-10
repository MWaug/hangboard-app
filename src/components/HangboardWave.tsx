import React, { useState } from "react"
import { Card, Button, Alert, ListGroup } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { Line } from "react-chartjs-2"

export default function HangboardWave() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()!
    const history = useHistory()
    // const mqttConnect = (host, mqttOption) => {

    // };

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    const data = {
        datasets: [
            {
                label: "Dataset 1",
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                lineTension: 0,
                borderDash: [8, 4],
                data: [{ x: 0, y: 0 }]
            }
        ]
    }

    const options = {
        scales: {
            x: {
            },
            y: {
                title: {
                    display: true,
                    text: "Weight (lbs)"
                }
            }
        }
    }

    // useEffect(() => {
    // }, [])

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Hangboard Waveform</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Line data={data} options={options} />
                    <div className='mt-5'>
                        <ListGroup>
                            <ListGroup.Item>Hang 1</ListGroup.Item>
                            <ListGroup.Item>Hang 2</ListGroup.Item>
                        </ListGroup>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </>
    )
}