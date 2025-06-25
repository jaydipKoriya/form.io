export function readJsonFile<T>(file: Blob) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            if (event.target) {
                // const data=
                resolve(JSON.parse(event.target.result as string));
            }
        };

        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file);
    });
}
