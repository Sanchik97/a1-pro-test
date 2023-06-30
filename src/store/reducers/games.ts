import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGame, RealType } from '@/models/game'
import mock from '@/_mock/games.json'

interface IGamesFilters {
  count: number
  provider: string | undefined
  real: RealType | undefined
}

interface IGamesState {
  gamesList: IGame[]
  games: IGame[]
  game: IGame | undefined
  providers: string[]
  reals: RealType[]
  filters: IGamesFilters
}

// Initial State
const initialState: IGamesState = {
  gamesList: [],
  games: [],
  game: undefined,
  providers: [],
  reals: [
    RealType.btc,
    RealType.usdt,
    RealType.dog,
    RealType.eth,
    RealType.ltc,
    RealType.xrp,
  ],
  filters: {
    count: 12,
    real: undefined,
    provider: undefined,
  },
}

// Slice
const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    fetchGames: (state) => {
      const data = Object.entries(mock)
        .map(([key, val]) => ({
          id: key,
          provider: val['provider'],
          real: val['real'],
          collections: val['collections'],
          title: val['title'],
        }))
        .sort(
          (a, b) => a.collections['popularity'] - b.collections['popularity'],
        ) as IGame[]

      state.gamesList = data
      state.games = data
    },
    fetchGame: (state, action: PayloadAction<string>) => {
      state.game = state.gamesList.find((game) => game.id === action.payload)
    },
    fetchProviders: (state) => {
      state.providers = [
        ...new Set(state.gamesList.map((game) => game.provider)),
      ]
    },
    showMore: (state) => {
      state.filters.count = state.filters.count + 12
    },
    selectProvider: (state, action: PayloadAction<string>) => {
      state.games = state.gamesList.filter((game) =>
        game.provider.includes(action.payload),
      )
      state.filters.provider = action.payload
      state.filters.count = 12
    },
    selectReal: (state, action: PayloadAction<RealType>) => {
      state.games = state.gamesList.filter((game) => game.real[action.payload])
      state.filters.real = action.payload
      state.filters.count = 12
    },
  },
})

//Actions
export const {
  fetchGames,
  fetchGame,
  fetchProviders,
  selectProvider,
  selectReal,
  showMore,
} = gamesSlice.actions

// Export reducer
export default gamesSlice.reducer
