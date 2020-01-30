export interface BingSearchResponse 
{
    totalEstimatedMatches : number;
    value : ImageResult[];
}

export interface ImageResult {
    name: string;
    thumbnailUrl: string;
}

export interface ImageResult {
    name: string;
    thumbnailUrl: string;
    imageId: string;
    encodingFormat: string;
}

export interface ImagePostRequest {
    userId: string;
    description: string;
    tags: string[];
    url: string;
    id: string;
    encodingFormat: string;
}