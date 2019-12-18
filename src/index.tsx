import * as React from "react";
import * as ReactDOM from "react-dom";

import Routes from "./routes";

class IndexPage extends React.Component {
    render() {
        return <Routes />;
    }
}

ReactDOM.render(<IndexPage />, document.getElementById("appArea"));
