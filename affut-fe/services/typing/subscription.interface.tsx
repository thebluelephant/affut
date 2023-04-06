export interface Subscription {
    line_items: { price: string },
    mode: string,
    success_url : string,
    client_reference_id: string    
}