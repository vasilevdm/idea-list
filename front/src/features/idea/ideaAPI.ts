import axios from 'axios';
import Idea from './model/Idea.interface';
import ListResponse from './model/ListResponse.interface';
import FetchByPageRequest from './model/fetchByPageRequest.interface';
import FetchByIdRequest from './model/fetchByIdRequest.interface';
import UpdateIdeaRequest from './model/UpdateIdeaRequest.interface';

const apiHost = process.env.REACT_APP_API_HOST;

export const fetchByPage = (request: FetchByPageRequest) => {
    const {page, perPage} = request;
    return axios.get<ListResponse<Idea>>(
        `${apiHost}/api/v1/ideas/page`,
        { params: {page, perPage} }
    );
}

export const fetchById = (request: FetchByIdRequest) => {
    const {ideaId, direction, perPage} = request;
    return axios.get<ListResponse<Idea>>(
        `${apiHost}/api/v1/ideas/list`,
        { params: {ideaId, direction, perPage} }
    );
}

export const addIdea = (title: string) => axios.post<Idea>(
        `${apiHost}/api/v1/ideas`,
        { title }
    )

export const patchIdea = (request: UpdateIdeaRequest) => {
    const {id, title, completed} = request;
    return axios.patch<null>(
        `${apiHost}/api/v1/ideas/${id}`,
        { title, completed }
    );
}

export const deleteIdea = (id: number) => axios.delete<null>(`${apiHost}/api/v1/ideas/${id}`)