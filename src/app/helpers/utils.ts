export class Utils {
    public static generateUniqueId() : number{
        return new Date().getTime();
    }
    public static getRandomValueFromArray(array) : any{
        return array[Math.floor(Math.random() * array.length)];
    }
}
