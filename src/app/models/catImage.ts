export class CatImage {
    id: string = '';
    url: string = '';
    loading: boolean = true;

    constructor(loading: boolean){
        this.loading = loading;
    }
}
