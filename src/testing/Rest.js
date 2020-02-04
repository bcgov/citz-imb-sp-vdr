import React, { Component } from 'react'
import axios from 'axios'

export class Rest extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    // ERROR HANDLING
    errorHandling() {
        axios
            .get('https://jsonplaceholder.typicode.com/todoss', {
                // validateStatus: function(status) {
                //   return status < 500; // Reject only if status is greater or equal to 500
                // }
            })
            .then(res => this.showOutput(res))
            .catch(err => {
                //if (err.response) {
                // Server responded with a status other than 200 range
                console.log("error", err)
                console.log("response", err.response)
                console.log("responseText", err.response.request.responseText)
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);


                //if (err.response.status === 404) {
                //alert('Error: Page Not Found');
                //}
                //} else if (err.request) {
                // Request was made but no response
                //console.error(err.request);
                //} else {
                //console.error(err.message);
                // }
            });
    }

    // Show output in browser
    showOutput(res) {
        console.log(res)
    }

    render() {
        return (
            <div className={"container my-5"}>
                <div className={"text-center"}>
                    <h1 className={"display-4 text-center mb-3"}>Axios Crash Course</h1>
                    <button className={"btn btn-primary my-3"} id={"get"}>GET</button>
                    <button className={"btn btn-info"} id={"post"}>POST</button>
                    <button className={"btn btn-warning"} id={"update"}>PUT/PATCH</button>
                    <button className={"btn btn-danger"} id={"delete"}>DELETE</button>
                    <button className={"btn btn-secondary"} id={"sim"}>Sim Requests</button>
                    <button className={"btn btn-secondary"} id={"headers"}>
                        Custom Headers
                    </button>
                    <button className={"btn btn-secondary"} id={"transform"}>
                        Transform
                    </button>
                    <button className={"btn btn-secondary"} id={"error"} onClick={this.errorHandling}>
                        Error Handling
                    </button>
                    <button className={"btn btn-secondary"} id={"cancel"}>
                        Cancel
                    </button>
                </div>
                <hr />
                <div id={"res"}>
                    <div className={"card card-body mb-4"}>
                        <h5>Status: ${this.status}</h5>
                    </div>
                    <div className={"card mt-3"}>
                        <div className={"card-header"}>
                            Headers
      </div>
                        <div className={"card-body"}>
                            <pre>${JSON.stringify(this.headers, null, 2)}</pre>
                        </div>
                    </div>
                    <div className={"card mt-3"}>
                        <div className={"card-header"}>
                            Data
      </div>
                        <div className={"card-body"}>
                            <pre>${JSON.stringify(this.data, null, 2)}</pre>
                        </div>
                    </div>
                    <div className={"card mt-3"}>
                        <div className={"card-header"}>
                            Config
      </div>
                        <div className={"card-body"}>
                            <pre>${JSON.stringify(this.config, null, 2)}</pre>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Rest
