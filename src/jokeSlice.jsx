import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const fetchJoke = createAsyncThunk("jokes/jokescategory", async function (category) {
    return axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then((result) => {
            console.log(result.data.value)
            return result.data.value
        })
})

const initialState = {
    joke: "NO JOKE"
}

const jokeSlice = createSlice({
    name: "joke",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchJoke.pending, function () {
            console.log("Loading...")
        }).addCase(fetchJoke.fulfilled, function (state, action) {
            state.joke = action.payload
        })
    }
})

export default jokeSlice
export { fetchJoke }