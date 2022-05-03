import apiClient from '../../app/httpClient';
import Idea from './model/Idea.interface';
import ListResponse from './model/ListResponse.interface';
import FetchByPageRequest from './model/fetchByPageRequest.interface';
import FetchByIdRequest from './model/fetchByIdRequest.interface';
import UpdateIdeaRequest from './model/UpdateIdeaRequest.interface';

export const fetchByPage = (request: FetchByPageRequest) => {
    const {page, perPage} = request;
    return apiClient.get<ListResponse<Idea>>(
        '/v1/ideas/page',
        { page, perPage }
    );
}

export const fetchById = (request: FetchByIdRequest) => {
    const {ideaId, direction, perPage} = request;
    return apiClient.get<ListResponse<Idea>>(
        '/v1/ideas/list',
        { ideaId, direction, perPage }
    );
}

export const addIdea = (title: string) => apiClient.post<{title: string}, Idea>(
        '/v1/ideas',
        { title }
    )

export const patchIdea = (request: UpdateIdeaRequest) => {
    const {id, title, completed} = request;
    return apiClient.patch<{title: string, completed: boolean}, Idea>(
        `/v1/ideas/${id}`,
        { title, completed }
    );
}

export const deleteIdea = (id: number) => apiClient.delete<null>(`/v1/ideas/${id}`)