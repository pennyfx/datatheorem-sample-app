
import React from 'react';
import { connect } from 'react-redux';


/**
 *  Footer with some info and a ajax loading notifier
 *
 * @class Footer
 * @extends {React.Component}
 */
class Footer extends React.Component {
  render() {
    var loader = <div></div>;
    if (this.props.isFetching){
      loader = <div className="loader" title="loader"></div>
    }
    return (
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <div className="mdl-logo">Arron Schaar - Data Theorem exersize</div>
        </div>
        <div className="mdl-mini-footer__right-section">
          {loader}
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  isFetching: React.PropTypes.bool
}

export default connect((state) => {
    return {
      isFetching: state.isFetching
    }
})(Footer);
