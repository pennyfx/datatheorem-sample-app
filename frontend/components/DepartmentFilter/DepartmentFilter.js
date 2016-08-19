import React from 'react';
import s from './styles.css';
import dep_filters from './dep_filters.json';



/**
 *  Loads a static cache of all deperatments, then allows you to check off the ones you want to see.
 *
 * @class DepartmentFilter
 * @extends {React.Component}
 */
class DepartmentFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments:dep_filters.departments
    }
  }

  handleClick(event){
    this.props.filterChanged(event.target.name);
  }

  render() {
    return (
      <div>
      <label>Filters:</label>
      <ul className={s.content}>
        {this.state.departments.sort().map((item)=>{
          var checked = this.props.activeFilters.indexOf(item) > -1;
          return <li key={item}><input type="checkbox"
            name={item}
            onChange={this.handleClick.bind(this)}
            checked={checked} />
              <span>{item.toLowerCase()}</span></li>;
        })}
      </ul>
      </div>
    );
  }
}

DepartmentFilter.propTypes = {
  filterChanged: React.PropTypes.func,
  activeFilters: React.PropTypes.array
}

export default DepartmentFilter;