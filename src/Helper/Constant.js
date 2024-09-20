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
    GET_USER_BY_ID: "user/get-user-by-id",
    // Tournaments end points
    PAST_TOURNAMENTS: 'tournament/filtered/Past_Tournament',
    ONGOING_TOURNAMENTS: 'tournament/filtered/Ongoing',
    UPCOMING_TOURNAMENTS: "tournament/filtered/Upcoming",
    MY_TOURNAMENT: "tournament/mytournaments",
    GET_TOURNAMENT_BY_ID: "tournament/get",
    FEATURED_TOURNAMENT: "tournament/featured",
    REGISTER_TOURNAMENT: "tournament/enroll",

    // notification
    GET_ALL_NOTIFICATION: 'notification/get-all',
    NOTIFICATION_SEEN: "notification/change-status",

    // Group chat endpoints
    GET_USER_BY_TOURNAMENT: "user/tournament-wise-users",
    GET_BRACKET_DATA: "game/get-brackets",

    // Score submission
    SCORE_SUBMISSION: "score/submit-score",

    // Game ID edit end points
    EDIT_GAME_ID: "game/udpate-gameID",

    // comment Endpoints
    ADD_COMMENT: "comment/add-comment",

    // report issue endpoints
    REPORT_ISSUE: "issue/report-issue"

}