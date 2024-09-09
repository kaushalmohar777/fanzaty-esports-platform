export const END_POINTS = {
    GET_ALL_COUNTRY_CODE: 'country/get-all',
    // auth endpoints
    GET_AVATAR_IMAGES: 'avtar/get-urls',
    SIGN_UP: "user/auth/signup",
    LOGIN: "user/auth/login",
    GET_USER_DATA: "user/get-user",
    FORGOT_PASSWORD: "user/forgot-password",
    VERIFY_OTP: "user/verify-otp",
    UPDATE_PASSWORD: "user/reset-password",
    UPDATE_PROFILE: "user/update-profile",
    GET_ALL_USER: "user/get-all",
    // Tournaments end points
    PAST_TOURNAMENTS: 'tournament/filtered/Past_Tournament',
    ONGOING_TOURNAMENTS: 'tournament/filtered/Ongoing',
    UPCOMING_TOURNAMENTS: "tournament/filtered/Upcoming",
    MY_TOURNAMENT: "tournament/mytournaments",
    GET_TOURNAMENT_BY_ID: "tournament/get",
    FEATURED_TOURNAMENT: "tournament/featured",

    // notification
    GET_ALL_NOTIFICATION: 'notification/get-all',

    // Group chat endpoints
    GET_USER_BY_TOURNAMENT: "user/tournament-wise-users"
}