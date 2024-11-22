/* eslint-disable @typescript-eslint/no-shadow */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getPokemon = createAsyncThunk(
  'pokemon/getPokemon',
  async (_params, {getState, dispatch}) => {
    dispatch(nextPage());
    const {page, data, limit, offset} = getState().pokemon;

    try {
      const res = await axios(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
      );

      if (page === 1) {
        return res?.data;
      }
      return {results: data.concat(await res?.data?.results)};
    } catch (err) {
      return {results: []};
    }
  },
);

export const getAbility = createAsyncThunk('pokemon/getAbility', async url => {
  try {
    const res = await axios.get(url);

    return res?.data;
  } catch (err) {
    return null;
  }
});

export const pokemon = createSlice({
  name: 'pokemon',
  initialState: {
    data: [],
    page: 0,
    limit: 10,
    offset: 0,
    loading: false,
    error: null,
    ability: {},
  },
  reducers: {
    nextPage: state => {
      // eslint-disable-next-line no-sequences
      (state.page = state.page + 1),
        (state.offset = state.page > 1 ? state.page * state.limit : 0);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPokemon.pending, state => {
        state.loading = true;
      })
      .addCase(getPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.results;
      })
      .addCase(getPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAbility.pending, state => {
        state.loading = true;
      })
      .addCase(getAbility.fulfilled, (state, action) => {
        state.loading = false;
        state.ability = action.payload;
      });
  },
});

export default pokemon.reducer;

export const {nextPage} = pokemon.actions;
