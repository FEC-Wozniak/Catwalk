import React from 'react';
import handler from '../../global_functions/handler';
import UrlWindow from '../new_review_components/UrlWindow';

class Helpfulness extends React.Component {
  constructor(props) {
    super(props);
    let { helpfulness } = this.props;
    this.state = {
      clicked: false,
      count: helpfulness,
      report: false,
    };
    this.click = this.click.bind(this);
    this.toggleWindow = this.toggleWindow.bind(this);
  }

  click(e) {
    const { reviews } = handler;
    const { id } = this.props;
    const { clicked, count } = this.state;
    if (!clicked) {
      let name = e.target.getAttribute('name');
      if (name === 'helpful') {
        this.setState({ clicked: true, count: count + 1 });
        reviews.update(id, 'helpful');
      }
      if (name === 'report') {
        this.setState({ report: true });
      }
    }
  }

  toggleWindow(bool) {
    this.setState({ report: bool });
  }

  render() {
    let { count } = this.state;
    const { removeReview, index } = this.props;
    return (
      <div style={{fontSize: '90%', color: 'grey' }}>
        <span>Helpful? </span>
        <span name="helpful" className="helpful austinButtons" onClick={this.click} style={{ textDecoration: 'underline' }}>Yes</span>
        <span> ({ count })    |    </span>
        <span name="report" className="helpful austinButtons" onClick = {this.click} style={{ textDecoration: 'underline' }}>Report</span>
        {this.state.report && (
          <UrlWindow title="FEC-Wozniak: Report Abuse" onClose={() => { this.toggleWindow(false); }}>
              <div>
                <h1 style={{ fontFamily: 'Avenir Black' }}>Report abuse</h1>
                <p style={{ fontFamily: 'Ariel' }}>If you find this content inappropriate
                  and think it should be removed from the
                  FEC-Wozniak site, let us know by clicking the button below.
                </p>
                <br />
                <button
                  type="submit"
                  style={{
                    marginTop: '0',
                    backgroundColor: '#e11a2b',
                    border: 'none',
                    outline: '0',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const { reviews } = handler;
                    const { id } = this.props;
                    reviews.update(id, 'report');
                    this.setState(
                      { clicked: true, report: false },
                      removeReview(index),
                    );
                }} >Report
                </button>
            </div>
          </UrlWindow>
        )}
      </div>
    );
  }
}

export default Helpfulness;
