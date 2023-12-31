
export interface Stores {
    id:string;
    name:string;
    domain:string
    image_background:string;
    games_count:number;
}

export interface Game { 
    background_image: string;
    id: string;
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
  
     hoverState: 'initial' | 'hovered';
      // Add this property
     
}

export interface Geners { 
    id: string,
    name: string;
    slug: string;
    games_count: number;
    image_background:string
}

export interface AGameStores { 
    id: string,
    store_id: string;
    url: string;
}


export interface APIResponse<T> {

    results: Array<T>;
    count: number;
    next: string;
}

interface Genre {
    id:string;
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






