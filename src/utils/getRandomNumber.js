// generates a random number 
export default function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
};