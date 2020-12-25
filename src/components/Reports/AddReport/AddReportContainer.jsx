import React from "react"
import AddReport from "./AddReport";
import {connect} from "react-redux";
import {addReportThunkCreator} from "../../../redux/report-reducer";

class AddReportContainer extends React.Component {
    render() {
        return <AddReport {...this.props}></AddReport>
    }
}

let mapDispatchToProps = (dispatch) => ({
    addReport: (amountSpent, descriptionsOfExpenses) => {
        addReportThunkCreator(amountSpent, descriptionsOfExpenses)(dispatch);
    }
})

export default connect(null, mapDispatchToProps)(AddReportContainer);