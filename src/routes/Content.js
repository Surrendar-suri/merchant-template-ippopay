import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import AddEditProfile from "../views/Profile/AddEditProfile";
import ProfileDetails from "../views/Profile/ProfileDetails";
import Settlementdetails from "../views/Settlement/SettlementDetails";
import SettlementList from "../views/Settlement/SettlementList";
import AddSettlementBank from "../views/SettlementBank/AddSettlementBank";
import SettlementBankList from "../views/SettlementBank/SettlementBankList";
import SettlementLinkStore from "../views/SettlementBank/SettlementLinkStore";
import Storedetails from "../views/Store/storedetails";
import StoreList from "../views/Store/StoreList";
import VPAList from "../views/Vpa/VPAList";
import VPATransactionList from "../views/Vpa/VPATransactionist";
import AddSubmerchant from "../views/SubMerchant/AddSubmerchant";
import EditSubmerchant from "../views/SubMerchant/EditSubmerchant";
import Submerchantdetails from "../views/SubMerchant/Submerchantdetails";
import SubmerchantList from "../views/SubMerchant/SubmerchantList";
import EditSubuser from "../views/SubUser/Editsubuser";
import AddSubuser from "../views/SubUser/OLDAddSubuser";
import subuserdetails from "../views/SubUser/subuserdetails";
import SubuserList from "../views/SubUser/SubuserList";
import Details from "../views/Transaction/details";
import TransactionList from "../views/Transaction/TransactionList";
import { getCookie } from "gfdu";
import DashboardDetails from "../views/Dashboard/details";
export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let merchantobj = JSON.parse(getCookie('merchantobject'));

       

        return (
            <>
                {merchantobj.role === "merchant" ?
                    <Switch>
                        <Route path="/signin" exact render={() => <Redirect to="/dashboard" />} />
                        <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
                        <Route path="/dashboard"  exact component={Dashboard} />
                        <Route path="/dashboard/details/:id" exact component={DashboardDetails} />
                        <Route path="/transaction" exact component={TransactionList} />
                        <Route path="/transaction/details/:id" exact component={Details} />
                        <Route path="/settlement" exact component={SettlementList} />
                        <Route path="/settlement/details/:id" exact component={Settlementdetails} />
                        <Route path="/store" exact component={StoreList} />
                        <Route path="/store/details/:id" exact component={Storedetails} />
                        {/* <Route path="/vpa" exact component={VPAList} /> */}
                        {/* <Route path="/vpa/transaction" exact component={VPATransactionList} /> */}
                        <Route path="/subuser" exact component={SubuserList} />
                        <Route path="/subuser/edit/:id" exact component={EditSubuser} />
                        {/* <Route path="/subuser/add" exact component={AddSubuser} /> */}
                        <Route path="/subuser/details/:id" exact component={subuserdetails} />
                        <Route path="/submerchant" exact component={SubmerchantList} />
                        <Route path="/submerchant/details/:id" exact component={Submerchantdetails} />
                        <Route path="/submerchant/add" exact component={AddSubmerchant} />
                        <Route path="/submerchant/edit/:id" exact component={EditSubmerchant} />
                        <Route path="/settlementbank" exact component={SettlementBankList} />
                        {/* <Route path="/settlementbank/add" exact component={AddSettlementBank} /> */}
                        <Route path="/settlementbank/link" exact component={SettlementLinkStore} />
                        <Route path="/profile/edit" exact component={AddEditProfile} />
                        <Route path="/profile" exact component={ProfileDetails} />
                        <Route path="*" render={() => <Redirect to="/dashboard" />} />
                        </Switch> : merchantobj.role === "subuser" ?
                        //SUB MERCHANT
                        <Switch>
                            <Route path="/signin" exact render={() => <Redirect to="/dashboard" />} />
                            <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
                            <Route path="/dashboard" exact component={Dashboard} />
                            <Route path="/dashboard/details/:id" exact component={DashboardDetails} />
                            <Route path="/transaction" exact component={TransactionList} />
                            <Route path="/transaction/details/:id" exact component={Details} />
                            <Route path="/settlement" exact component={SettlementList} />
                            <Route path="/settlement/details/:id" exact component={Settlementdetails} />
                            <Route path="/store" exact component={StoreList} />
                            <Route path="/store/details/:id" exact component={Storedetails} />
                            <Route path="/subuser" exact component={SubuserList} />
                            <Route path="/subuser/edit/:id" exact component={EditSubuser} />
                            {/* <Route path="/subuser/add" exact component={AddSubuser} /> */}
                            <Route path="/subuser/details/:id" exact component={subuserdetails} />
                            <Route path="/profile/edit" exact component={AddEditProfile} />
                            <Route path="/profile" exact component={ProfileDetails} />
                            <Route path="*" render={() => <Redirect to="/dashboard" />} />
                        </Switch> :

                        //SUBUSER OR ANY

                        <Switch>
                            <Route path="/signin" exact render={() => <Redirect to="/transaction" />} />
                            <Route path="/" exact render={() => <Redirect to="/transaction" />} />
                            {/* <Route path="/dashboard" exact component={Dashboard} /> */}
                            <Route path="/transaction" exact component={TransactionList} />
                            <Route path="/transaction/details/:id" exact component={Details} />
                            {/* <Route path="/settlement" exact component={SettlementList} /> */}
                            {/* <Route path="/settlement/details/:id" exact component={Settlementdetails} /> */}
                            <Route path="/profile/edit" exact component={AddEditProfile} />
                            <Route path="/profile" exact component={ProfileDetails} />
                            <Route path="*" render={() => <Redirect to="/transaction" />} />
                        </Switch>}


            </>
        );
    }
}
