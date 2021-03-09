import React from 'react';

class Helpfulness extends React.Component {
  constructor(props) {
    super(props);
    let { helpfulness } = this.props;
    this.state = {
      clicked: false,
      count: helpfulness,
    };
    this.click = this.click.bind(this);
  }

  click(e) {
    if (!this.state.clicked) {
      let newCount;
      let name = e.target.getAttribute('name');
      if (name === 'yes') { newCount = this.state.count + 1; }
      if (name === 'no') { newCount = this.state.count - 1; }
      this.setState({ clicked: true, count: newCount });
    }
  }

  render() {
    let { count } = this.state;
    return (
      <div style={{fontSize: '90%', color: 'grey' }}>
        <span>Helpful? </span>
        <span name="yes" className="helpful" onClick={this.click} style={{ textDecoration: 'underline' }}>Yes</span>
        <span> ({ count })    |    </span>
        <span name="no" className="helpful" onClick = {this.click} style={{ textDecoration: 'underline' }}>No</span>
      </div>
    );
  }
}

export default Helpfulness;
