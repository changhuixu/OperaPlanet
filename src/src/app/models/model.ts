
export abstract class Model {

    protected internalData:any;

    protected abstract readData();
    public abstract updateFromPartial(subid:number, partial:any);
    public abstract updateActiveState(currentTime:Date);
    public abstract getDisplayData() : DisplayData;
    public abstract getLocation(): GeoPoint;
    public abstract getTypeAsString(): string;

    constructor(protected dateHelper: DateConverterService, initialData:any) {
        this.internalData = initialData;
        this.readData();
    }


    public getData() {
        return this.internalData;
    }

    get id() : number {
        return this.internalData.id;
    }

    get activeState() {
        return this._activeState;
    }

    get visible() : boolean {
        return this._isVisible;
    }

}
