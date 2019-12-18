import React from "react";

import Navbar from "../../components/Navbar";

const Error = (props: any) => {
    const { status, message } = props.location.state;

    return (
        <>
            <Navbar />
            <h3>Error</h3>
            <p>Status: {status}</p>
            <p>Error: {message}</p>
        </>
    );
};

export default Error;
