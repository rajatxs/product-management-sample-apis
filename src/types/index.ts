export interface Supplier {
   id?: number;
   name: string;
   email: string;
   password_hash: string;
   phone?: string;
   address?: string;
   created_at?: Date;
   updated_at?: Date;
}

export type SupplierDetails = Pick<Supplier, 'id'|'email'|'name'|'phone'|'address'>

export interface Product {
   id?: number;
   name: string;
   price: number;
   sku: string;
   supplier_id: number;
   prices?: Record<string, number|string>
   created_at?: Date;
   updated_at?: Date;
}
