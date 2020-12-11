/* eslint-disable complexity */
import { HttpVerbs } from './HttpVerbs';

const isSuccess = (res) => res && res.status && res.statusCode >= 200 && res.statusCode <= 299;
const isError = (err) => err && err.status && err.status >= 500;

export class ApiResponseImplementor {
  constructor(notifier) {
    this.notifier = notifier;
  }

  handleResponse = (req, err, res) => {
    if (isError(err)) {
      this.handleResponseError(req, err, res);
      return;
    }

    if (isSuccess(res)) {
      this.handleResponseSuccess(req, res);
    } else {
      this.handleResponseFailure(req, err, res);
    }
  };

  handleResponseSuccess = (req, res) => {
    if (req.allowsDefaultSuccess && req.verb !== HttpVerbs.get) {
      this.notifier.success();
    }

    req.callbacks.success.forEach((callback) => callback(res));
  };

  handleResponseFailure = (req, err, res) => {
    const resultIsUnauthorized = () => res && res.status === 401;
    const errMessage = res && res.body ? res.body : null;
    if (req.allowsDefaultFailure) {
      if (resultIsUnauthorized()) {
        this.notifier.error('La sesion ha expirado.');

        window.location.href = `http://${window.location.hostname}:${window.location.port}/#/sign-in`;
      } else {
        this.notifier.warning(errMessage);
      }
    }

    req.callbacks.failure.forEach((callback) => callback(res));
  };

  handleResponseError = (req, err, res) => {
    if (req.allowsDefaultError) {
      window.location.href = `http://${window.location.hostname}:${window.location.port}/#/sign-in`;
    }
    req.callbacks.error.forEach((callback) => callback(err, res));
  };
}
