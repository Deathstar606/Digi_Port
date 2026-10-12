import React from "react";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";

function CaseDeats (props) {
    if (props.case) {
        return (
            <>
                <MediaQuery minWidth={640}>
                    <div style={{backgroundColor: "black"}}>  
                        <div style={{ paddingLeft: "50px", paddingTop: '50px', paddingBottom: "50px", backgroundColor: "black" }}>
                            <div
                                className="embed-responsive embed-responsive-16by9"
                                style={{
                                    maxHeight: '80vh',
                                    position: 'fixed',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)', // Centers the element horizontally and vertically
                                    width: '90%', // Set fixed width
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <iframe
                                    src={props.case.video}
                                    title={props.case.name || "Video Player"}
                                    width="640"
                                    height="480"
                                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                        <div 
                            className="text-center"
                            style={{ padding: "80px 150px", marginTop: "100vh", overflowY: 'auto', position: "relative", backgroundColor: "white" }}
                        >
                            <h1>{props.case.name}</h1>
                            <p className="mt-4">{props.case.description}</p>
                            <div className="mt-4">
                                <Link 
                                    to="/home" 
                                    className="butt" 
                                    style={{ textDecoration: "none", display: "inline-block" }}
                                >
                                    ← Back to Case Studies
                                </Link>
                            </div>
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={639}>
                    <div style={{ backgroundColor: "#000", position: "relative", minHeight: "100vh", overflowX: "hidden" }}>  
                        {/* Video Playback Container for Mobile */}
                        <div
                            style={{
                                position: 'fixed',
                                top: '44%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '92%',
                                maxWidth: '540px',
                                aspectRatio: '16 / 9',
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 1,
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.85)",
                                backgroundColor: "#000",
                                border: "1px solid rgba(255, 255, 255, 0.12)"
                            }}
                        >
                            <iframe
                                src={props.case.video}
                                title={props.case.name || "Video Player"}
                                style={{
                                    border: "none",
                                    width: "100%",
                                    height: "100%",
                                    display: "block"
                                }}
                                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Scroll prompt on mobile */}
                        <div
                            style={{
                                position: 'fixed',
                                bottom: '20px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 1,
                                color: 'rgba(255, 255, 255, 0.75)',
                                fontSize: '11px',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '2px',
                                pointerEvents: 'none'
                            }}
                        >
                            <span>Scroll for details</span>
                            <span style={{ fontSize: '14px' }}>↓</span>
                        </div>

                        {/* Description Section for Mobile */}
                        <div 
                            style={{ 
                                padding: "40px 22px 60px 22px", 
                                marginTop: "100vh", 
                                position: "relative", 
                                backgroundColor: "white",
                                zIndex: 2,
                                borderRadius: "24px 24px 0 0",
                                boxShadow: "0 -10px 30px rgba(0,0,0,0.6)",
                                minHeight: "50vh"
                            }}
                        >
                            <div style={{ textAlign: "center", marginBottom: "12px" }}>
                                <span
                                    style={{
                                        display: "inline-block",
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        letterSpacing: "1.5px",
                                        color: "#F1593A",
                                        textTransform: "uppercase",
                                        backgroundColor: "rgba(241, 89, 58, 0.12)",
                                        padding: "4px 12px",
                                        borderRadius: "20px"
                                    }}
                                >
                                    Case Study
                                </span>
                            </div>
                            <h1 
                                className="text-center"
                                style={{
                                    fontSize: "clamp(1.4rem, 5.5vw, 2rem)",
                                    fontWeight: 800,
                                    lineHeight: 1.3,
                                    color: "#111111",
                                    marginBottom: "16px"
                                }}
                            >
                                {props.case.name}
                            </h1>
                            <p 
                                className="mt-3 text-center"
                                style={{
                                    fontSize: "0.95rem",
                                    lineHeight: 1.75,
                                    color: "#444444"
                                }}
                            >
                                {props.case.description}
                            </p>
                            <div className="text-center mt-4 pt-2">
                                <Link 
                                    to="/home" 
                                    className="butt" 
                                    style={{ 
                                        textDecoration: "none", 
                                        display: "inline-block",
                                        fontSize: "14px",
                                        padding: "6px 20px"
                                    }}
                                >
                                    ← Back to Case Studies
                                </Link>
                            </div>
                        </div>
                    </div>
                </MediaQuery>
            </>
        )
    }
}

export default CaseDeats