import * as Mime from 'mime/lite';
import { BaseResource } from '@gitbeaker/requester-utils';
import { endpoint, RequestHelper } from '../infrastructure';
import type { ShowExpanded, GitlabAPIResponse } from '../infrastructure';

function url({ projectId, groupId }) {
  if (projectId) {
    return endpoint`/projects/${projectId}/packages/debian`;
  } else if (groupId) {
    return endpoint`/groups/${groupId}/-/packages/debian`;
  }

  throw new Error('groupId or projectId must be given');
}

export class Debian<C extends boolean = false> extends BaseResource<C> {
  downloadBinaryFileIndex<E extends boolean = false>(
    distribution: string,
    component: string,
    architecture: string,
    {
      projectId,
      groupId,
      ...options
    }: (
      | { projectId: string | number; groupId: never }
      | { groupId: string | number; projectId: never }
    ) &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    if (!projectId && !groupId) throw new Error('groupId or projectId must be given');

    return RequestHelper.get<Blob>()(
      this,
      `${url({
        projectId,
        groupId,
      })}/dists/${distribution}/${component}/binary-${architecture}/Packages`,
      options as ShowExpanded<E>,
    );
  }

  downloadDistributionReleaseFile<E extends boolean = false>(
    distribution: string,
    {
      projectId,
      groupId,
      ...options
    }: (
      | { projectId: string | number; groupId: never }
      | { groupId: string | number; projectId: never }
    ) &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    if (!projectId && !groupId) throw new Error('groupId or projectId must be given');

    return RequestHelper.get<Blob>()(
      this,
      `${url({ projectId, groupId })}/dists/${distribution}/Release`,
      options as ShowExpanded<E>,
    );
  }

  downloadSignedDistributionReleaseFile<E extends boolean = false>(
    distribution: string,
    {
      projectId,
      groupId,
      ...options
    }: (
      | { projectId: string | number; groupId: never }
      | { groupId: string | number; projectId: never }
    ) &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    if (!projectId && !groupId) throw new Error('groupId or projectId must be given');

    return RequestHelper.get<Blob>()(
      this,
      `${url({ projectId, groupId })}/dists/${distribution}/InRelease`,
      options as ShowExpanded<E>,
    );
  }

  downloadReleaseFileSignature<E extends boolean = false>(
    distribution: string,
    {
      projectId,
      groupId,
      ...options
    }: (
      | { projectId: string | number; groupId: never }
      | { groupId: string | number; projectId: never }
    ) &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    if (!projectId && !groupId) throw new Error('groupId or projectId must be given');

    return RequestHelper.get<Blob>()(
      this,
      `${url({ projectId, groupId })}/dists/${distribution}/Release.gpg`,
      options as ShowExpanded<E>,
    );
  }

  downloadPackageFile<E extends boolean = false>(
    projectId: string | number,
    distribution: string,
    letter: string,
    packageName: string,
    packageVersion: string,
    filename: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<Blob, C, E, void>> {
    return RequestHelper.get<Blob>()(
      this,
      endpoint`projects/${projectId}/packages/debian/pool/${distribution}/${letter}/${packageName}/${packageVersion}/${filename}`,
      options,
    );
  }

  uploadPackageFile<E extends boolean = false>(
    projectId: string | number,
    content: string,
    filename: string,
    options?: ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<unknown, C, E, void>> {
    const meta = {
      filename,
      contentType: Mime.getType(filename),
    };

    return RequestHelper.put<unknown>()(
      this,
      endpoint`projects/${projectId}/packages/debian/${filename}`,
      {
        isForm: true,
        ...options,
        file: [content, meta],
      },
    );
  }
}