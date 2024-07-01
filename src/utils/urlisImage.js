
export default function urlisImage(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}