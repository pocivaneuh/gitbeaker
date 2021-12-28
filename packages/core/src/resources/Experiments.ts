import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper, PaginatedRequestOptions, GitlabAPIResponse } from '../infrastructure';

export interface ExperimentSchema extends Record<string, unknown> {
  key: string;
  definition: {
    name: string;
    introduced_by_url: string;
    rollout_issue_url: string;
    milestone: string;
    type: string;
    group: string;
    default_enabled: boolean;
  };
  current_status: {
    state: string;
    gates?: ExperimentGateSchema[];
  };
}

export interface ExperimentGateSchema {
  key: string;
  value: boolean | number;
}

export class Experiments<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends 'keyset' | 'offset' = 'keyset'>(
    options?: PaginatedRequestOptions<E, P>,
  ): Promise<GitlabAPIResponse<ExperimentSchema[], C, E, P>> {
    return RequestHelper.get<ExperimentSchema[]>()(this, 'experiments', options);
  }
}