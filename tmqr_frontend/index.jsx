import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
//import DateRangePickerForDataCall from './pages/daterange.jsx';
import PageRouter from './pages/page_router.jsx';

//class App extends React.Component {
//  render () {
//    return <p> Hello React Test!</p>;
//  }
//}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {current_page : 'index'};
        this.onNewPageClick = this.onNewPageClick.bind(this);
    }
    onNewPageClick (page_name) {
        this.setState({current_page : page_name});
    }

  render () {
    return (
    <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div>
                    <a className="navbar-brand" href="/">TMQR GMI Analysis</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="/admin/">Settings</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-3 col-md-2 sidebar">
                    <ul className="nav nav-sidebar">
                        <li><a onClick={() => this.onNewPageClick('index')}>Dashboard</a></li>
                    </ul>
                    <h4>GMI Analysis</h4>
                    <ul className="nav nav-sidebar">
                        <li><a onClick={() => this.onNewPageClick('gmi_fees')}>GMI Fees</a></li>
                        <li><a onClick={() => this.onNewPageClick('gmi_accounts')}>Account Performance</a></li>
                    </ul>
                </div>
                <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <PageRouter page_name={this.state.current_page}/>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));