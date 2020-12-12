import React from "react"

class UpdateReport extends React.Component {
    render() {
        debugger
        return (
            <div>
                <form>
                    <div>
                        <label>Сумма траты {this.props.report.amountSpent}</label>
                        <input type="number" value={this.props.amountSpentForm} onChange={this.props.changeAmountSpennt}/>
                    </div>
                    <div>
                        <label>Описания траты {this.props.report.descriptionsOfExpenses}</label>
                        <input value={this.props.descriptionsOfExpensesForm} onChange={this.props.changeDescriptionsOfExpenses}/>
                    </div>
                    <div>
                        <button type="reset" onClick={() => this.props.updateReport(this.props.amountSpentForm, this.props.descriptionsOfExpensesForm,
                            this.props.report.id)}>
                            Обновить
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UpdateReport;