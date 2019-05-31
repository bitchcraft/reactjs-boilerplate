DummyListItem examples

```js

const Icons = require('@material-ui/icons');
const IconsAsArray = Object.keys(Icons).map(v => Icons[v]);
const icon = React.createElement(
	IconsAsArray[Math.floor(IconsAsArray.length * Math.random())],
	{ htmlColor: '#fff' }
);



<DummyListItem
	avatarStyle={{
		backgroundColor: '#888'
	}}
	icon={icon}>

	{'I am a cat!'}

</DummyListItem>

```
