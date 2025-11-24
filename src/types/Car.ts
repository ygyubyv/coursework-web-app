export interface Car {
  id: string;
  number: string;
  brand: string;
  model: string;
  color: string;
}

export type CreateCar = Omit<Car, "id">;
export type UpdateCar = Omit<Car, "id">;

export type CarAction = "create" | "update" | "delete";
