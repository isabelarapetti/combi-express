import superagent from 'superagent';
import { SpinnerService } from './lib/spinner/SpinnerService';
import { PermissionsMediator } from './lib/storageMediators/PermissionsMediator';

export const GlobalState = {
  SpinnerService: new SpinnerService(),
  Superagent: superagent.agent(),
  PermissionsMediator,
};
