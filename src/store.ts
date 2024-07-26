import { configureStore } from "@reduxjs/toolkit";
import loginReducer, { setLoginStatus } from "./pages/login/slice";
// import registerReducer from "./pages/register/slice";
// import userReducer from "./pages/user/slice";
// import homeReducer from "./pages/home/slice";
// import artistsReducer from "./pages/artists/slice";
import artistReducer from "./pages/artist/slice";
// import albumsReducer from "./pages/albums/slice";
import albumReducer from "./pages/album/slice";
// import songsReducer from "./pages/songs/slice";
import songReducer from "./pages/song/slice";
import User from "./types/user";

const store = configureStore({
  reducer: {
    login: loginReducer,
    // register: registerReducer,
    // user: userReducer,
    // home: homeReducer,
    // artists: artistsReducer,
    artist: artistReducer,
    // albums: albumsReducer,
    album: albumReducer,
    // songs: songsReducer,
    song: songReducer,
  },
});

const token = localStorage.getItem("token");
const userString = localStorage.getItem("user");
let user: User | null = null;

if (userString) {
  user = JSON.parse(userString) as User;
}

if (token && user) {
  store.dispatch(setLoginStatus({ user, token }));
}

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;