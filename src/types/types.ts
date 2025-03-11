export interface PaymentMethod {
  id: string
  last4: string
  type: string
  exp: string
}

export interface ApiResponse {
  paymentMethods?: PaymentMethod[]
  success?: boolean
  message?: string
  error?: string
}
