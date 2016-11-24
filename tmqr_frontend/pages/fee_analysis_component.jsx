
import React from "react";
import DateRangePickerForDataCall from './daterange.jsx';

var moment = require('moment');

class GMIFeeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {fee_info: {}},
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
        return $.getJSON('/api/gmifees/'+ this.state.startDate + '/' + this.state.endDate)
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

        const listItems = Object.keys(this.state.data.fee_info).map((key) =>
            <ContractQuotesItem key={key} fee_data={this.state.data.fee_info[key]}/>
        );

        return (
            <div>
            <small>
                <h1>GMI Fees</h1>
                <DateRangePickerForDataCall onMagicClick={this.sendData}/>
                <div>

                    <table className="table table-bordered">

                        <thead>
                        <tr>
                            <th>FCM</th>
                            <th>Office</th>
                            <th>Account</th>
                            <th>Trad ed Qty Buy</th>
                            <th>Trad ed Qty Sell</th>
                            <th>Comm ission</th>
                            <th>Clear ing Fees</th>
                            <th>Exch ange Fees</th>
                            <th>Trans action Fees</th>
                            <th>NFA Fees</th>
                            <th>Broker age Fees</th>
                            <th>Trade Process ing Fees</th>
                            <th>CBOT Globex Fee</th>
                            <th>CME Globex Fee</th>
                            <th>Give In Fee</th>
                            <th>Total Fees</th>
                            <th>Total Fees & Commiss ions</th>
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
            <td>{ qi.Office }</td>
            <td>{ qi.Account }</td>
            <td>{ qi.TradedQuantityBuy }</td>
            <td>{ qi.TradedQuantitySell }</td>
            <td>{ qi.Commission }</td>
            <td>{ qi.ClearingFees }</td>
            <td>{ qi.ExchangeFees }</td>
            <td>{ qi.TransactionFees }</td>
            <td>{ qi.NFAFees }</td>
            <td>{ qi.BrokerageFees }</td>
            <td>{ qi.TradeProcessingFees }</td>
            <td>{ qi.CBOT_Globex_Fee }</td>
            <td>{ qi.CME_Globex_Fee }</td>
            <td>{ qi.Give_In_Fee }</td>
            <td>{ qi.TotalFees }</td>
            <td>{ qi.SumOfFeesAndCommission }</td>

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

export default GMIFeeComponent;
