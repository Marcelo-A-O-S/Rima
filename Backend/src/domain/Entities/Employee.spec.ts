import {expect, test } from 'vitest'
import { Employee } from './Employee'

test('criar um usuário',()=>{
    const employee = new Employee({
        firstName: 'Jhon',
        lastName: 'Doe',
        id: 0,
        email: 'jhondoe@gmail.com'
    });
    employee.createPasswordHash('12345');
    expect(employee).toBeInstanceOf(Employee);
})
test('verificar password hash correto',()=>{
    const employee = new Employee({
        firstName: 'Jhon',
        lastName: 'Doe',
        id: 0,
        email: 'jhondoe@gmail.com'
    });
    const password = '12345'
    employee.createPasswordHash(password);
    expect(employee.verifyPasswordHash(password)).toBe(true);
})
test('verificar password hash falso',()=>{
    const employee = new Employee({
        firstName: 'Jhon',
        lastName: 'Doe',
        id: 0,
        email: 'jhondoe@gmail.com'
    });
    const password = '12345'
    employee.createPasswordHash(password);
    expect(employee.verifyPasswordHash('54321')).toBe(false);
})
