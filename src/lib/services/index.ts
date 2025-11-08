import { authServices } from "./auth"
import { newsServices } from "./news"
import { userServices } from "./user"

export const services = {
    auth: authServices,
    user: userServices,
    news: newsServices
    
}