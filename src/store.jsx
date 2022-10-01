import React from 'react';
import {action, makeObservable, observable} from "mobx";
import {nanoid} from "nanoid";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

export const StoreContext = React.createContext(null);

export class Store
{
	@observable texture = 'Dirt';
	@observable.shallow cubes = getLocalStorage('cubes') || [];

	constructor()
	{
		makeObservable(this);
	}

	@action.bound
	addCube(x, y, z)
	{
		this.cubes.push({
			key: nanoid(),
			position: [x, y, z],
			texture: this.texture
		});
	}

	@action.bound
	removeCube(x, y, z)
	{
		this.cubes = this.cubes.filter(({position}) => position[0] !== x || position[1] !== y || position[2] !== z);
	}

	@action.bound
	setTexture(texture)
	{
		this.texture = texture;
	}

	@action.bound
	save()
	{
		setLocalStorage('cubes', this.cubes);
	}

	@action.bound
	reset()
	{
		this.cubes = [];
	}
}