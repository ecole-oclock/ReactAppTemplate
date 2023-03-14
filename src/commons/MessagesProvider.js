import React, { PureComponent, useContext } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from '@o-clock-dev/mooncake';

export const MessagesContext = React.createContext();

export const useInfo = () => useContext(MessagesContext).showInfo;

export const useWarning = () => useContext(MessagesContext).showWarning;

export const useSuccess = () => useContext(MessagesContext).showSuccess;

export const useError = () => useContext(MessagesContext).showError;

export const withMessages = (WrappedComponent) => {
  function withMessageComponent({ ...props }) {
    return <WrappedComponent {...props} {...useContext(MessagesContext)} />;
  }

  withMessageComponent.propTypes = {
    showInfo: PropTypes.func,
    showWarning: PropTypes.func,
    showSuccess: PropTypes.func,
    showError: PropTypes.func,
  };

  return withMessageComponent;
};

class MessagesProvider extends PureComponent {
  commonConfig = {
    position: 'bottom-left',
    closeButton: false,
  };

  constructor(props) {
    super(props);
    this.messageContextValue = {
      showInfo: this.showInfo,
      showWarning: this.showWarning,
      showSuccess: this.showSuccess,
      showError: this.showError,
    };
  }

  getToastElement = ({
    toastProps: { message, title = null, dataTestId = 'toast-element' },
  }) => (
    <div className="notification-content" data-testid={dataTestId}>
      {title && <div className="notification-title">{title}</div>}
      <div className="notification-body">{message}</div>
    </div>
  );

  showInfo = (
    message,
    title = null,
    duration = 10000,
    dataTestId = 'notification_info',
  ) => toast.info(this.getToastElement, {
    ...this.commonConfig,
    position: 'bottom-left',
    title: title || 'Information',
    message,
    autoClose: duration,
    dataTestId,
  });

  showWarning = (
    message,
    title = null,
    duration = 10000,
    dataTestId = 'notification_warning',
  ) => toast.warning(this.getToastElement, {
    ...this.commonConfig,
    position: 'bottom-left',
    title: title || 'Attention !',
    message,
    autoClose: duration,
    dataTestId,
  });

  showSuccess = (
    message,
    title = null,
    duration = 10000,
    dataTestId = 'notification_success',
  ) => toast.success(this.getToastElement, {
    ...this.commonConfig,
    title,
    message,
    autoClose: duration,
    dataTestId,
  });

  showError = (
    message,
    title = null,
    duration = 10000,
    dataTestId = 'notification_error',
  ) => toast.error(this.getToastElement, {
    ...this.commonConfig,
    title:
        title
        || (message.name !== 'Error' && message?.name)
        || 'Oups ! Une erreur est survenue',
    message: message?.message || message,
    autoClose: duration,
    dataTestId,
  });

  render() {
    const { children } = this.props;

    return (
      <MessagesContext.Provider value={this.messageContextValue}>
        {children}
        <ToastContainer />
      </MessagesContext.Provider>
    );
  }
}

MessagesProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

MessagesProvider.defaultProps = {};

export default MessagesProvider;
