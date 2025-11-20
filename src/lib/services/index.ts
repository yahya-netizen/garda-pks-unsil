import { authServices } from "./auth"
import { newsServices } from "./news"
import { userServices } from "./user"
import { kuisServices } from "./kuis"
import { chatService } from "./chat"
import { commentServices } from "./comment"

export const services = {
    auth: authServices,
    user: userServices,
    news: newsServices,
    kuis: kuisServices,
    komunitas: chatService,
    comment: commentServices
}