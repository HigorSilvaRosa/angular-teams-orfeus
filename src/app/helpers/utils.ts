export class Utils {
    public static generateUniqueId(): number {
        return new Date().getTime();
    }
    public static getRandomValueFromArray(array): any {
        return array[Math.floor(Math.random() * array.length)];
    }

    public static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    public static objectToArray(obj) {
        let array = []
        let keys = Object.keys(obj)
        for (var i in keys) {
            let key = keys[i];
            array.push(obj[key]);
        }
        return array;
    }

    public static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
