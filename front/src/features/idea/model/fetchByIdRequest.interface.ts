import FetchDirection from './fetchDirection.enum';

export default interface FetchByIdRequest {
    ideaId: number;
    direction: FetchDirection.NEXT | FetchDirection.PREV;
    perPage: number;
}