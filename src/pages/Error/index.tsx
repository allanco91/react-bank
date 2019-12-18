import React from "react";

import Menu from "../../components/Menu";

const Error = (props: any) => {
    const { status, error } = props;

    return (
        <>
            <Menu />
            <h3>Error</h3>
            <p>Status: {status}</p>
            <p>Error: {error}</p>
        </>
    );
};

export default Error;
