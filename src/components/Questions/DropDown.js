import React, {Component} from 'react';
import './css/dropdown.scss';

class DropDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOpen: false
        }
        this.onSelectDropDownItem = this.onSelectDropDownItem.bind(this);
        this.toggleList = this.toggleList.bind(this);

    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    onSelectDropDownItem(id) {
        this.props.onSelectDropDownItem(id);
    }

    render() {

        const {listOpen} = this.state;

        return (
            <div className="dropdown-wrapper" onClick={this.toggleList}>
                <div className="dropdown-toggle">
                    <div
                        className="dropdown-selected">{!(this.props.dropDownValue == null) ? this.props.choices[this.props.dropDownValue].value : 'Choose from list'}</div>
                    <i className={`icon-style dropdown-arrow fas fa-chevron-${listOpen ? 'up':'down'}`}></i>
                    <br style={{clear: "both"}}/>
                </div>
                {listOpen && <ul className="dropdown-menu">
                    {this.props.choices.map((item)=> (
                        <li className="dropdown-menu-item" key={item.id}
                            onClick={() => this.onSelectDropDownItem(item.id)}>{item.value}</li>
                    ))}
                </ul>}
            </div>
        )
    }
}

export default DropDown;
