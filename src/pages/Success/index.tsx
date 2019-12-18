import React from "react";

import Navbar from "../../components/Navbar";

const Success = (props: any) => {
    const { message, value, balance } = props.location.state;

    return (
        <>
            <Navbar />
            <h3>Success</h3>
            <p>{message}</p>
            <p>Value: {value}</p>
            <p>New balance: {balance}</p>
        </>
    );
};

export default Success;
