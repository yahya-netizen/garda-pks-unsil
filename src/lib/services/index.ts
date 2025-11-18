import { authServices } from "./auth"
import { newsServices } from "./news"
import { userServices } from "./user"
import { kuisServices } from "./kuis"
import { chatService } from "./chat"

export const services = {
    auth: authServices,
    user: userServices,
    news: newsServices,
    kuis: kuisServices,
    komunitas: chatService
}