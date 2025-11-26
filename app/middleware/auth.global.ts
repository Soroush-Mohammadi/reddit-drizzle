import { authClient } from "~~/lib/auth-client"


export default defineNuxtRouteMiddleware(async (to,from) => {
    const { data : session } = await authClient.useSession(useFetch)
    console.log(session.value?.user.name,'middleware')
})