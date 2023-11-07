

export interface Game { 
    background_image: string;
    name: string; 
    released:  string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: number;
    genres: Array<Genre>;
    parent_platforms: Array<ParentPlatform>;
    publishers: Array <Publishers>;
    ratings: Array<Rating>;
    short_screenshots: Array <Short_screenshot>;
     trailers: Array<Trailer>;
     hoverState: 'initial' | 'hovered'; // Add this property

}
export interface APIResponse<T> { 
    results: Array<T>;
}
interface Genre {
    name: string;
}
interface ParentPlatform{
    platform: {
    id: number;
  name: string;
  slug: string;
    };
}


interface Publishers{
    name:string;

}
interface Rating{
 id: number;
 count:number;
 title:string;
}
interface Short_screenshot{
   
image:string;
}
interface Trailer{
    data: {
        max:string;
    }

}






