import React, { Component } from 'react';
import { FixedHeader } from '../../Common/JS/FixedHeader';
import Spinner from 'react-spinner-material';
import { confirmAlert } from 'react-confirm-alert';


class TechChefs extends Component {
    state = {
        loading: false,
        str1: '',
        str2: '',
        outputArr: [],
        userId: [1, 3, 10],
        selectedUser: 1,
        userData: {
            "id": "",
            "email": "",
            "first_name": "",
            "last_name": "",
            "avatar": ""
        }
    }
    showResult = () => {
        if (!this.state.str1 || !this.state.str2) {
            confirmAlert({
                title: "Information",
                message: 'Please enter required fields.',
                buttons: [
                    {
                        label: 'Ok'
                    },

                ]

            });
        }
        else {
            let op1 = ''
            let op2 = ''
            let arr1 = this.state.str1.split('')
            let arr2 = this.state.str2.split('')
            for (let i = 0; i < arr1.length; i++) {
                if (!arr2.includes(arr1[i])) {
                    op1 = op1 + arr1[i]
                }
            }
            for (let i = 0; i < arr2.length; i++) {
                if (!arr1.includes(arr2[i])) {
                    op2 = op2 + arr2[i]
                }
            }
            this.setState({
                outputArr: [{
                    srt1: this.state.str1,
                    srt2: this.state.str2,
                    op1: op1,
                    op2: op2
                }]
            })

        }
    }

    fetchUserData = () => {
        this.setState({ loading: true });
        fetch("https://reqres.in/api/users/" + this.state.selectedUser)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        loading: false,
                        userData: result.data
                    });
                },

                (error) => {
                    this.setState({ loading: false });

                }
            )

    }
    render() {
        return (
            <div class="my_app_container">
                <div class="rechargehome_wrapper">
                    <div>
                        <div class="container">
                            <div class="">
                                <div class="row">
                                    <div class="col">
                                        {FixedHeader()}
                                        <section class="card-view-sm mt-3">
                                            <div class="md-font f-16 pl-3 pb-2">P1</div>
                                            <div class="card shadow-sm">
                                                <div class="card-body">
                                                    <div className="spin">
                                                        <Spinner visible={this.state.loading}
                                                            spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                                                    </div>
                                                    <div class="row no-gutters">
                                                        <div class="col-12">
                                                            <form action="" class="">
                                                                <div class="login">
                                                                    <div class="form-group">
                                                                        <input id="str1" type="text" required="required" onChange={(e) => this.setState({ str1: e.target.value })} />
                                                                        <label for="str1" class="control-label">Enter string 1<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <input id="str2" type="text" required="required" onChange={(e) => this.setState({ str2: e.target.value })} />
                                                                        <label for="str2" class="control-label">Enter string 2<label style={{ color: "#FF0000" }}>*</label></label>
                                                                    </div>
                                                                </div>
                                                            </form>

                                                            <div className="cust-dtl mt-0">

                                                                <div className="row" style={{ marginTop: "25px" }}>
                                                                    {/* <div className="col-6 col-sm-6">
                                                                        <button type="button" className="jio-btn jio-btn jio-btn-primary bg-transparent primary-c1 w-100 mb-2 mr-1"
                                                                            onClick={() => this.props.history.push({ pathname: '/Signup' })}
                                                                        >Sign Up</button>
                                                                    </div> */}
                                                                    <div className="col-6 col-sm-6">
                                                                        <button type="button" className="jio-btn jio-btn jio-btn-primary w-100 mb-2 ml-1"
                                                                            onClick={() => this.showResult()}
                                                                        >Check Output</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {this.state.outputArr.length ?
                                                                <table cellpadding="0" cellspacing="0" class="list-data">
                                                                    <tr>
                                                                        <th>str1</th>
                                                                        <th>str2</th>
                                                                        <th>op1</th>
                                                                        <th>op2</th>
                                                                    </tr>
                                                                    {this.state.outputArr.map((item, key) => {

                                                                        return (
                                                                            <tr key={key}>
                                                                                <td>{item.srt1}</td>
                                                                                <td>{item.srt2}</td>
                                                                                <td>{item.op1 ? item.op1 : "<null>"}</td>
                                                                                <td>{item.op2 ? item.op2 : "<null>"}</td>
                                                                            </tr>

                                                                        )
                                                                    })}
                                                                </table> : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section class="card-view-sm mt-3">
                                            <div class="md-font f-16 pl-3 pb-2">P2</div>
                                            <div class="card shadow-sm">
                                                <div class="card-body">

                                                    <div class="row no-gutters">
                                                        <div class="col-12">
                                                            <div className="col-6">
                                                                <select className="custom-select rounded-0 p-1" id="userId" value={this.state.selectedUser}
                                                                    onChange={(e) => this.setState({ selectedUser: e.target.value })}>
                                                                    {this.state.userId.map((element) => (<option>{element}</option>))}
                                                                </select>
                                                            </div>

                                                            <div className="col-6 mt-5">
                                                                <button type="button" className="jio-btn jio-btn-primary"
                                                                    onClick={() => this.fetchUserData()}
                                                                >Get Data</button>
                                                            </div>

                                                            <div className="mt-5"><b>User ID :</b> {this.state.userData.id}</div>
                                                            <div><b>Email ID :</b> {this.state.userData.email}</div>
                                                            <div><b>First Name :</b> {this.state.userData.first_name}</div>
                                                            <div><b>Last Name :</b> {this.state.userData.last_name}</div>
                                                            <div><b>Avatar :</b> <img src={this.state.userData.avatar}></img></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TechChefs;