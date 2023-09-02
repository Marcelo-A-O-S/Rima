interface IServices<T> {
    Save(entity: T): Promise<string>;
    GetAll(): Promise<T[] >;
    GetbyId(id: number): Promise<T>

}
export { IServices }
