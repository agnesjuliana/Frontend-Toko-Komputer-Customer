import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./Login"
import Product from "./Product"
import Cart from "./Cart"
import Transaction from "./Transaction"

const Utama = () => (
    <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Product} />
        <Route path="/transaction" component={Transaction} />
        <Route path="/cart" component={Cart} />
    </Switch>
)

export default Utama