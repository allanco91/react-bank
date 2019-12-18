import React from "react";

import Menu from "../../components/Menu";

const Success = (props: any) => {
    const { message, value, balance } = props.location.state;

    return (
        <>
            <Menu />
            <h3>Success</h3>
            <p>{message}</p>
            <p>Value: {value}</p>
            <p>New balance: {balance}</p>
        </>
    );
};

export default Success;
