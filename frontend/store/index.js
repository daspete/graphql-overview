export const actions = {
    async nuxtServerInit({ commit, dispatch }, { app }){
        const apollo = app.apolloProvider.defaultClient
        const token = app.$cookies.get('testapp')

        if(token){
            commit('auth/setToken', token)
        }

        try {
            
        }catch(err){
            console.log(err)

            commit('auth/setToken', null)
            
            app.$cookies.remove('testapp')
        }
    }
}