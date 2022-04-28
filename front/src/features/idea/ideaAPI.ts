import Idea from './model/Idea.interface';
import ListResponse from './model/ListResponse.interface';
import FetchByPageRequest from './model/fetchByPageRequest.interface';

export const fetchByPage = async (request: FetchByPageRequest) => new Promise<ListResponse<Idea>>((resolve) => {
        if (request.page === 1) {
            resolve(
                {
                    items: [
                        {
                            id: 1,
                            title: 'title 1',
                            completed: false
                        },
                        {
                            id: 2,
                            title: 'title 2',
                            completed: true
                        }
                    ]
                }
            )
        } else {
            resolve(
                {
                    items: [
                        {
                            id: 3,
                            title: 'title 3',
                            completed: true
                        },
                        {
                            id: 4,
                            title: 'title 4',
                            completed: false
                        }
                    ]
                }
            )
        }
        }
    );