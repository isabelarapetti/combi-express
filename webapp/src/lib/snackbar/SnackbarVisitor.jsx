const successMessage = 'The operation has completed successfully.';
const errorMessage = 'An error has occurred. Please contact your IT department.';

let displayedMessagesList = [];
const interval = 1500;

function wasDisplayedRecently(message) {
  const alreadyDisplayed = (element) =>
    element.message === message && new Date().getTime() - element.time.getTime() < interval;

  if (displayedMessagesList.length <= 0) return false;
  if (displayedMessagesList.some(alreadyDisplayed)) return true;

  return false;
}
const showMessage = (props, message, variant) => {
  if (!wasDisplayedRecently(message)) {
    props.enqueueSnackbar(message, { variant });

    displayedMessagesList.push({ message, time: new Date() });

    displayedMessagesList = displayedMessagesList.filter(
      (element) => new Date().getTime() - element.time.getTime() < interval
    );
  }
};

export class SnackbarVisitor {
  constructor(componentProps) {
    this.props = componentProps;
  }

  success = (message) => showMessage(this.props, message || successMessage, 'success');

  error = (message) => showMessage(this.props, message || errorMessage, 'error');

  warning = (message) => showMessage(this.props, message, 'warning');
}
