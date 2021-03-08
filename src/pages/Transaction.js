import React from "react"
import { base_url, product_image_url } from "../config.js";
import $ from "jquery"
import axios from "axios"
import MyHeader from "../components/Header"
import TransactionList from "../components/TransactionList"


export default class Page extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            customer: null,
            transaction: [],
        }


        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            if(localStorage.getItem("customer")){
                this.state.customer = JSON.parse(localStorage.getItem("customer"))
            }
        } else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    // FUNCTION GET TRANSACTION START
    getTransaction = () => {
        let url = base_url + "/transaksi/" + this.state.customer.customer_id

        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({transaction: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    // FUNCTION GET TRANSACTION END

    componentDidMount(){
        this.getTransaction()
    }

    render(){
        return (
            <div>
                <MyHeader color="pink" title="Transaction List" src="https://drive.google.com/uc?id=1HJa1U_8RbW44pZbHEeaWWIpaqK2b_8U5">
                    "You're more successful when you have fun. So let's have fun and made a plot twist"
                </MyHeader>

                <div className="container my-5">
                    { this.state.transaction.map(item => (
                        <TransactionList
                        key = {item.transaksi_id}
                        transaction_id = {item.transaksi_id}
                        customer_name = {item.customer.name}
                        customer_address = {item.customer.address}
                        time = {item.waktu}
                        products = {item.detail_transaksi}
                         />
                    )) }
                </div>
            </div>
        )
    }

}
