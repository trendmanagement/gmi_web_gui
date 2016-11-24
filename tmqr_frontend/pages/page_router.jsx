import React from 'react';

import GMIFeeComponent from './fee_analysis_component.jsx';
import GMIAccountComponent from './account_performance_component.jsx';

class PageRouter extends React.Component {
    /*
     Routes the pages of the dashboard application
    */

    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.page_name){
            case 'index':
                return (<h1>Index page</h1>);
            case 'gmi_fees':
                return (<GMIFeeComponent/>);
            case 'gmi_accounts':
                return (<GMIAccountComponent/>);
            default:
                return (<h1>Page not found</h1>);
        }
    }
}

export default PageRouter;