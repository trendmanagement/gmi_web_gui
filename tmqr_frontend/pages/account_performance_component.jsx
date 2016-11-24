
import React from "react";
import DateRangePickerForDataCall from './daterange.jsx';

var moment = require('moment');

class GMIAccountComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {account_info: {}},
            is_loading: false,
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
        };
        this.getData = this.getData.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    sendData(startDate, endDate){
        this.state.startDate = startDate;
        this.state.endDate = endDate;

        this.getData();
    }

    getData(){
        //
        // Show pre-load animation
        //
        //this.props.start_date


        this.setState({
            is_loading: true,
        });

        console.log('Requesting exo data ' + this.state.startDate)
        return $.getJSON('/api/gmiaccountperformance/'+ this.state.startDate + '/' + this.state.endDate)
            .done((result) => {
                this.setState({
                    data: result,
                    is_loading: false
                });
            })
            .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ', ' + error;
                console.log( "Request Failed: " + err);
            })
    }


    render() {
        //if (this.state.is_loading){
        //    return (<PreloadAnimation/>)
       //}

        const listItems = Object.keys(this.state.data.account_info).map((key) =>
            <ContractQuotesItem key={key} fee_data={this.state.data.account_info[key]}/>
        );

        return (
            <div>
            <small>
                <h1>Account Performance</h1>
                <DateRangePickerForDataCall onMagicClick={this.sendData}/>
                <div>

                    <table className="table table-bordered">

                        <thead>
                        <tr>
                            <th>FCM</th>
                            <th>Sum mary Det ail Flag</th>
                            <th>Ccy</th>
                            <th>Firm</th>
                            <th>Office</th>
                            <th>Acc ount</th>
                            <th>Date</th>
                            <th>Acc ount Type</th>
                            <th>Comm ission</th>
                            <th>Total Fees</th>
                            <th>Trans actions Commiss ions Fees</th>
                            <th>Exch ange Code</th>
                            <th>Trad ed Quant ity Buy</th>
                            <th>Trad ed Quant ity Sell</th>
                            <th>Curr ent Pos ition</th>
                            <th>Total Equity</th>
                            <th>Curr ent OV</th>
                            <th>Change In AV At MD Con verted</th>
                            <th>Con verted Acc ount Value At Market</th>
                            <th>Con verted Prior Account Value At Market</th>
                            <th>Con verted Change In Account Value At Market</th>
                            <th>Init ial Margin Require ment</th>
                            <th>Maint enance Margin Requirement</th>
                            <th>Marg in Excess</th>
                            <th>Secur ity Master ID</th>
                            <th>Sect or Id</th>
                            <th>Sect or</th>
                            <th>Secur ity Master Desc</th>

                        </tr>
                        </thead>
                        <tbody>

                        {listItems}

                        </tbody>

                    </table>

                </div>
            </small>

            </div>
        );
    }
}


function ContractQuotesItem(props) {

    var qi = props.fee_data;

    //var date_now = moment(qi.date_now);

    return (
        <tr>
            <td>{ qi.FCM }</td>
            <td>{ qi.SummaryDetailFlag }</td>
            <td>{ qi.Ccy }</td>
            <td>{ qi.Firm }</td>
            <td>{ qi.Office }</td>
            <td>{ qi.Account }</td>
            <td>{ qi.Batchid }</td>
            <td>{ qi.AccountType }</td>
            <td>{ qi.Commission }</td>
            <td>{ qi.TotalFees }</td>
            <td>{ qi.TransactionsCommissionsFees }</td>
            <td>{ qi.ExchangeCode }</td>
            <td>{ qi.TradedQuantityBuy }</td>
            <td>{ qi.TradedQuantitySell }</td>
            <td>{ qi.CurrentPosition }</td>
            <td>{ qi.TotalEquity }</td>
            <td>{ qi.CurrentOV }</td>
            <td>{ qi.ChangeInAV_At_MD_Converted }</td>
            <td>{ qi.ConvertedAccountValueAtMarket }</td>
            <td>{ qi.ConvertedPriorAccountValueAtMarket }</td>
            <td>{ qi.ConvertedChangeInAccountValueAtMarket }</td>
            <td>{ qi.InitialMarginRequirement }</td>
            <td>{ qi.MaintenanceMarginRequirement }</td>
            <td>{ qi.MarginExcess }</td>
            <td>{ qi.SecurityMasterID }</td>
            <td>{ qi.SectorId }</td>
            <td>{ qi.Sector }</td>
            <td>{ qi.SecurityMasterDesc }</td>
        </tr>
    )

}

// var GMIFeeComponent = React.createClass({
//
//     //this.refs.
//
//     render() {
//         return <div>
//             <DateRangePickerForDataCall/>
//             <GMIFeeComponentTable start_date="2016-11-05"/>
//         </div>;
//     }
// });

export default GMIAccountComponent;
