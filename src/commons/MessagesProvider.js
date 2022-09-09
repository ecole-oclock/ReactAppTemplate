import React, { PureComponent, useContext } from 'react';
import PropTypes from 'prop-types';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MessagesContext = React.createContext();

export const useInfo = () => useContext(MessagesContext).showInfo;

export const useWarning = () => useContext(MessagesContext).showWarning;

export const useSuccess = () => useContext(MessagesContext).showSuccess;

export const useError = () => useContext(MessagesContext).showError;

export const withMessages = (WrappedComponent) => {
  const withMessageComponent = ({ ...props }) => (
    <WrappedComponent {...props} {...useContext(MessagesContext)} />
  );

  withMessageComponent.propTypes = {
    showInfo: PropTypes.func,
    showWarning: PropTypes.func,
    showSuccess: PropTypes.func,
    showError: PropTypes.func,
  };

  return withMessageComponent;
};

class MessagesProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.messageContextValue = {
      showInfo: this.showInfo,
      showWarning: this.showWarning,
      showSuccess: this.showSuccess,
      showError: this.showError,
    };
  }

  showInfo = (message, delay = 5000) => toast.info(message, { autoClose: delay });

  showWarning = (message, delay = 5000) => toast.warning(message, { autoClose: delay });

  showSuccess = (message, delay = 5000) => toast.success(message, { autoClose: delay });

  showError = (message, delay = 5000) => toast.error(message, { autoClose: delay });

  render() {
    const { children } = this.props;

    return (
      <MessagesContext.Provider
        value={this.messageContextValue}
      >
        <ToastContainer />
        { children }
      </MessagesContext.Provider>
    );
  }
}

MessagesProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

MessagesProvider.defaultProps = {
};

export default (MessagesProvider);
