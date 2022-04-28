import axios from 'axios';
import Idea from './model/Idea.interface';
import ListResponse from './model/ListResponse.interface';
import FetchByPageRequest from './model/fetchByPageRequest.interface';

const apiHost = process.env.REACT_APP_API_HOST;

export const fetchByPage = async (request: FetchByPageRequest) => {
    const {page, perPage} = request;
    return axios.get<ListResponse<Idea>>(
        `${apiHost}/api/v1/ideas/page`,
        { params: {page, perPage} }
    );
}