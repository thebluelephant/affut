export interface Subscription {
    line_items: [
        { price: string, quantity: number },
    ],
    mode: string,
    success_url : string,
    client_reference_id: string    
}