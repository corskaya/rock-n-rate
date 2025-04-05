import React from "react";

export const Home = React.lazy(() => import("./home/Index"));
export const Login = React.lazy(() => import("./login/Index"));
export const Register = React.lazy(() => import("./register/Index"));
export const Activation = React.lazy(() => import("./activation/Index"));
export const Albums = React.lazy(() => import("./albums/Index"));
export const Artists = React.lazy(() => import("./artists/Index"));
export const Songs = React.lazy(() => import("./songs/Index"));
export const Search = React.lazy(() => import("./search/Index"));
export const NotFound = React.lazy(() => import("./404/Index"));
export const About = React.lazy(() => import("./about/Index"));
export const ForgotPassword = React.lazy(() => import("./forgotPassword/Index"));
export const ResetPassword = React.lazy(() => import("./resetPassword/Index"));
export const User = React.lazy(() => import("./user/Index"));
export const Artist = React.lazy(() => import("./artist/Index"));
export const Album = React.lazy(() => import("./album/Index"));
export const Song = React.lazy(() => import("./song/Index"));
export const Language = React.lazy(() => import("./language/Index"));
