import {NearestFilter, TextureLoader} from 'three';
import Dirt from './assets/dirt.jpeg';
import Glass from './assets/glass.png';
import Grass from './assets/grass.jpeg';
import Log from './assets/log.jpeg';
import Wood from './assets/wood.png';

const DirtTexture = new TextureLoader().load(Dirt);
const GlassTexture = new TextureLoader().load(Glass);
const GrassTexture = new TextureLoader().load(Grass);
const LogTexture = new TextureLoader().load(Log);
const WoodTexture = new TextureLoader().load(Wood);

DirtTexture.magFilter = NearestFilter;
GlassTexture.magFilter = NearestFilter;
GrassTexture.magFilter = NearestFilter;
LogTexture.magFilter = NearestFilter;
WoodTexture.magFilter = NearestFilter;


export {
	DirtTexture,
	GlassTexture,
	GrassTexture,
	LogTexture,
	WoodTexture
}