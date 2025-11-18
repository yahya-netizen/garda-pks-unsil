export const chatService = {
    sendMessage: () => ({url: '/komunitas/chat/send', method: 'POST'}),
    getMessage: (next_cursor: string) => ({url: `/komunitas/chat/history/next_cursor=${next_cursor}`, method: 'GET'}),
};