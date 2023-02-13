import React, { PureComponent, useContext } from 'react';
import PropTypes from 'prop-types';
import { notification } from '@o-clock-dev/mooncake';

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
    placement: 'bottomLeft',
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

  showInfo = (message, title = null, duration = 4.5, dataTestId = 'notification_info') => notification.info({
    ...this.commonConfig,
    message: title || 'Information',
    description: message,
    duration,
    props: {
      'data-testid': dataTestId,
    },
  });

  showWarning = (message, title = null, duration = 4.5, dataTestId = 'notification_warning') => notification.warning({
    ...this.commonConfig,
    message: title || 'Attention !',
    description: message,
    duration,
    props: {
      'data-testid': dataTestId,
    },
  });

  showSuccess = (message, title = null, duration = 4.5, dataTestId = 'notification_success') => notification.success({
    ...this.commonConfig,
    message: title || 'Opération réalisée avec succès',
    description: message,
    duration,
    props: {
      'data-testid': dataTestId,
    },
  });

  showError = (message, title = null, duration = 4.5, dataTestId = 'notification_error') => notification.error({
    ...this.commonConfig,
    message: title || (message?.name && message.name !== 'Error') || 'Oups ! Une erreur est survenue',
    description: message?.message || message,
    duration,
    props: {
      'data-testid': dataTestId,
    },
  });

  render() {
    const { children } = this.props;

    return (
      <MessagesContext.Provider
        value={this.messageContextValue}
      >
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
