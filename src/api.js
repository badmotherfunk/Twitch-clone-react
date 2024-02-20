import axios from "axios";

let api = axios.create({
    headers: {
        'Client-ID' : 'k72jcgj6k7w8e9rbzd3rf4bctohrh7',
        "Authorization": "Bearer rhobgf64ze9p3gy66ztne31ysg9vci"
    }
})

/*
    CLIENT_ID = k72jcgj6k7w8e9rbzd3rf4bctohrh7
    REDIRECT = "http://localhost:3000/"

    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

    LIEN REMPLI = https://id.twitch.tv/oauth2/authorize?client_id=k72jcgj6k7w8e9rbzd3rf4bctohrh7&redirect_uri=http://localhost:3000/&response_type=token
*/

export default api;