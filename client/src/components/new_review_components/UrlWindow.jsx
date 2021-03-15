import React from 'react';
import ReactDOM from 'react-dom';

class UrlWindow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.containerEl = document.createElement('div');
    this.containerEl.setAttribute('id', 'urlWindow');
    this.externalWindow = null;
  }

  componentDidMount() {
    const { title, onClose } = this.props;

    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
    this.externalWindow.document.title = title || 'FEC-Wozniak';
    this.externalWindow.addEventListener('beforeunload', onClose);

    this.externalWindow.document.body.appendChild(this.containerEl);
  }

  componentWillUnmount() {
    this.externalWindow.close();
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }
}
export default UrlWindow;
