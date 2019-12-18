import React, { Component } from 'react'
import MaterialTable from "material-table"
import $ from 'jquery'

class PublicQuestions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [
                {
                    Question: "What am I doing?",
                    Answer: "Nothing.",
                    Category: "Do it"
                }
            ]
        }
    }

    componentWillMount() {
        //get public question list data
        let _this = this;

        $.ajax({
            url: "../_api/web/lists/getByTitle('Questions')/items",
            type: "GET",
            async: false,
            headers: {
                'Accept': 'application/json;odata=verbose'
            }
        }).done(function (result) {
            _this.state.data = result.d.results
        }).fail(function (err) {
            window.console && console.log(err)
        })
    }

    render() {
        return (
            <MaterialTable
                options={{
                    search: false,
                    paging: false,
                    sorting: false,
                    draggable: false
                }}
                columns={[
                    { title: "Question", field: "Question" },
                    { title: "Answer", field: "Answer" }
                ]}
                data={this.state.data}
                title="Public Questions"
            />

        )
    }
}

export default PublicQuestions