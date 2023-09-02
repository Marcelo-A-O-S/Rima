import {expect, test } from 'vitest'

import { Roles } from './Roles'

test('Create roles', ()=>{
    const role = new Roles({
        id:0,
        roleName: 'Gestão'
    })
    expect(role).toBeInstanceOf(Roles)
})
