import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { END_POINTS } from '../../Helper/Constant';
import { getApiRequest } from '../../services/getApiRequest';

// Async thunk to fetch data based on the id
export const fetchData = createAsyncThunk(
    'tournament/fetchData',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getApiRequest(`${END_POINTS.GET_TOURNAMENT_BY_ID}/${id}`);
            console.log('response: ', response);
            return response.tournament;
        } catch (error) {
            console.log('error: ', error);
            return rejectWithValue(error.response.data);
        }
    }
);

const tournamentSlice = createSlice({
    name: 'tournament',
    initialState: {
        data: {},
        status: 'idle',
        error: null,
    },
    reducers: {
        // You can add synchronous reducers here
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default tournamentSlice.reducer;
