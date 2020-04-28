// return randomized set of n questions
// Randomize array in -place using Durstenfeld shuffle algorithm
export const randomizeData = ( array, n=array.length ) => {
    for (let i = n-1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}