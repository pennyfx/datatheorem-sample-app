import React from 'react';
import s from './styles.css';



/**
 *  Very simple page that shows and prev and next caret
 *
 * @class SimplePager
 * @extends {React.Component}
 */
class SimplePager extends React.Component {

  handleClick(page){
    this.props.pageSelected(page);
  }

  render() {
    var prev = '', next = '';
    // only show prev if we're not on page 1'
    if (this.props.page != 1){
      prev = <a title="prev" href="#" onClick={this.handleClick.bind(this,this.props.page-1)} >&#8666;</a>
    }
    // only show next if we have a full set
    if (this.props.rows == this.props.maxSize){
      next = <a title="next" href="#" onClick={this.handleClick.bind(this,this.props.page+1)} >&#8667;</a>
    }

    return (
      <div className={s.content}>
        <label>Pager: {prev} {next}</label>
      </div>
    );
  }
}

SimplePager.propTypes = {
  pageSelected: React.PropTypes.func,
  page: React.PropTypes.number,
  rows: React.PropTypes.number,
  maxSize: React.PropTypes.number
}

export default SimplePager;