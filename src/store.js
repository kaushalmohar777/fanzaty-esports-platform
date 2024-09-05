import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './features/login/loginSlice';
import userReducer from './features/user/userSlice';
import countryReducer from './features/country/countrySlice';
import languageReducer from './features/language/language';
import tournamentReducer from './features/tournament/tournamentSlice';
import notificationReducer from './features/notification/notificationSlice';


export const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        country: countryReducer,
        language: languageReducer,
        tournament: tournamentReducer,
        notification: notificationReducer
    },
});
