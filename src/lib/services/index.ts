import { authServices } from "./auth"
import { newsServices } from "./news"
import { userServices } from "./user"
import { kuisServices } from "./kuis"

export const services = {
    auth: authServices,
    user: userServices,
    news: newsServices,
    kuis: kuisServices
}