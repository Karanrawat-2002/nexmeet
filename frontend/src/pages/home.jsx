import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");


    const {addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>

            <div className="navBar">

                {/* <div style={{ display: "flex", alignItems: "center" }}>

                    <h2>NexMeet</h2>
                </div> */}
                <h2>NexMeet</h2>
                <div style={{ display: "flex", alignItems: "center" }}>
                    
                    <button style={{backgroundColor:"transparent", color:"#2071cfff",border:"none",marginRight:"1rem", fontSize:"1.5rem"}} onClick={
                        () => {
                            navigate("/history")
                        }
                    }>
                       HISTORY
                    </button>
                    <Button 
                        style={{fontSize:"1.5rem", }}
                        onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/")
                       }}>
                        Logout
                    </Button>
                </div>
            </div>
            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                       
                        <h2>Providing Quality Video Call Just Like Quality Education</h2>

                        <div style={{ display: 'flex', gap: "10px" , marginTop:"2rem"}}>

                            <TextField style={{backgroundColor:"white", color:"white", borderRadius:"0.5rem"}} onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                            <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>

                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img srcSet='/home.jpg' alt="" />
                </div>
            </div>
        </>
    )
}


export default withAuth(HomeComponent)