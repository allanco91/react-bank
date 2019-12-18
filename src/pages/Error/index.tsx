import React from "react";

import Menu from "../../components/Menu";

const Error = (props: any) => {
    const { status, message } = props.location.state;

    return (
        <>
            <Menu />
            <h3>Error</h3>
            <p>Status: {status}</p>
            <p>Error: {message}</p>
        </>
    );
};

export default Error;
