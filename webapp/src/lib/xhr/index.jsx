import { ApiRequestFactory } from './ApiRequestFactory';
import { SuperagentApiImplementor } from './SuperagentApiImplementor';
import { ApiResponseImplementor } from './ApiResponseImplementor';

import { HttpVerbs } from './HttpVerbs';
import { ApiRequest } from './ApiRequest';

export class API {
  constructor(notifier) {
    const responseImplementor = new ApiResponseImplementor(notifier);
    const apiImplementor = new SuperagentApiImplementor(responseImplementor);
    this.request = new ApiRequestFactory(apiImplementor, process.env.REACT_APP_API_URL);
  }
}

export { HttpVerbs, ApiRequest };
