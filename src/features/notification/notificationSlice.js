import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { END_POINTS } from '../../Helper/Constant';
import { getApiRequest } from '../../services/getApiRequest';
import { showToast } from '../../shared/sharedComponents/ToasterMessage/ToasterMessage';



export const fetchNotificationData = createAsyncThunk(
    'notification/fetchNotificationData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getApiRequest(`${END_POINTS.GET_ALL_NOTIFICATION}`);
            return response.notifications;
        } catch (error) {
            showToast(error?.error?.message, 'error');
            return rejectWithValue(error.response.data);
        }
    }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
        notificationLength: 0
    },
    reducers: {
        // You can add synchronous reducers here
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotificationData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotificationData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.notificationLength = action.payload?.length
            })
            .addCase(fetchNotificationData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default notificationSlice.reducer;