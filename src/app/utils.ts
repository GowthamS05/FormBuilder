export function getDateTime() {
    let now = new Date();
    let datetime = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
    datetime += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return datetime;
}