import { atom, selector } from "recoil"

// ID: レコードのID
export const activeTarget = atom({
	key: 'activeTarget',
	default: 'Rental',
});

// target: Rental, Device, User
export const activeId = atom({
	key: 'activeId',
	default: 'null',
});

// mode: View, Edit, Register, Rental, Return, Inventory 
export const activeMode = atom({
	key: 'activeMode',
	default: 'View',
});

// 各種URL
export const listUrl = selector({
	key: 'listUrl',
	get:({get}) => process.env.NEXT_PUBLIC_SPRING_URL + '/get' + get(activeTarget) + 'List',
});
export const detailtUrl = selector({
	key: 'detailUrl',
	get:({get}) => process.env.NEXT_PUBLIC_SPRING_URL + '/get' + get(activeTarget) + 'Detail?id=' + get(activeId),
});
export const saveUrl = selector({
	key: 'saveUrl',
	get:({get}) => process.env.NEXT_PUBLIC_SPRING_URL + '/post' + get(activeTarget) + 'Save',
});
export const deleteUrl = selector({
	key: 'deleteUrl',
	get:({get}) => process.env.NEXT_PUBLIC_SPRING_URL + '/post' + get(activeTarget) + 'Delete',
});
export const registerUrl = selector({
	key: 'registerUrl',
	get:({get}) => process.env.NEXT_PUBLIC_SPRING_URL + '/post' + get(activeTarget) + 'Register',
});
export const manageUrl = selector({
	key: 'manageUrl',
	get:({get}) => process.env.NEXT_PUBLIC_SPRING_URL + '/post' + get(activeTarget) + get(activeMode),
});