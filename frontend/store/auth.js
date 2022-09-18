export const state = () => ({
    token: null
})

export const mutations = {
    setToken(state, token){
        state.token = token
    },
}

export const getters = {
    Token(state){
        return state.token
    },
}
