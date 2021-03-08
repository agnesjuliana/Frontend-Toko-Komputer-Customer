import React from "react"
import ProductList from "../components/ProductList"
import { base_url, Base_url, product_image_url } from "../config"
import $ from "jquery"
import axios from "axios"
import MyHeader from "../components/Header"

export default class Page extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            token: "",
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }


    // FUNCTION ADD TOKEN FOR AUTH IN HEADERS START
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    // FUNCTION ADD TOKEN FOR AUTH IN HEADER END

    // FUNCTION GET PRODUCT START
    getProduct = () => {
        let url = base_url + "/product"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ products: response.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    // FUNCTION GET PRODUCT END

    // START ComponentDidMount
    componentDidMount() {
        this.getProduct()
    }
    // END ComponentDidMount


    // FUNCTION ADD START
    addToCart = (selectedItem) =>{
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let existItem = tempCart.find(item => item.product_id === selectedItem.product_id)

        if(existItem){
            window.alert(`Anda telah memiliki ${selectedItem.name}`)
        }else{
            let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.name} yang dibeli`,"")
            if(promptJumlah !== null && promptJumlah !== ""){
                selectedItem.qty = promptJumlah
                tempCart.push(selectedItem)
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }
    // FUNCTION ADD END


    render() {
        return (
            <div>
                <MyHeader color="tosca" title="Product Customer" src="https://drive.google.com/uc?id=1og4-jZsZ9sFd6QsXTssCJNK5ub_zeQVu">
                    "You're more successful when you have fun. So let's have fun and made a plot twist"
                </MyHeader>

                <div className="container my-5">
                   <div className="row">
                       { this.state.products.map( item => (
                           <ProductList
                           key = {item.product_id}
                           name = {item.name}
                           price = {item.price}
                           stock = {item.stock}
                           image = { product_image_url + "/" + item.image}
                           onCart = {() => this.addToCart(item)}
                            />
                       )) }
                   </div>
                </div>
            </div>

        )
    }
}
