import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import Schedule from './panels/Schedule';

const App = () => {
	const faculty = [
		{value: 'aki', label: 'АКИ'},
		{value: 'asf', label: 'АСФ'},
		{value: 'ggf', label: 'ГГФ'},
		{value: 'im', label: 'ИМ'},
		{value: 'isgim', label: 'ИСГИМ'},
		{value: 'tf', label: 'ТФ'},
		{value: 'fmit', label: 'ФМИТ'},
		{value: 'fpbi', label: 'ФПБИ'},
		{value: 'fppds', label: 'ФППДС'},
		{value: 'ff', label: 'ФФ'},
		{value: 'fef', label: 'ФЭФ'},
		{value: 'fizf', label: 'ФизФ'},
		{value: 'hbf', label: 'ХБФ'},
		{value: 'eef', label: 'ЭЭФ'},
		{value: 'uf', label: 'ЮФ'},
	];
	const course = [
		{value: '1', label: '1 курс'},
		{value: '2', label: '2 курс'},
		{value: '3', label: '3 курс'},
		{value: '4', label: '4 курс'},
		{value: '5', label: '5 курс'},
		{value: '6', label: '6 курс'},
	];
	const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
	const [activePanel, setActivePanel] = useState('home');
	const [lessons, setLessons] = useState(['']);
	const [user, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		if (e.currentTarget.dataset.to === "schedule") {
		setPopout(<ScreenSpinner />);
			scrapSchedule(e.currentTarget.dataset.group, e.currentTarget.dataset.date).then(function(res) {
				setLessons(res);
				setPopout(null);
			});
		}
		setActivePanel(e.currentTarget.dataset.to);
	};

	async function scrapSchedule(group, date) {
		console.log(group);
		console.log(date);
		let lessons = []
		const url = "https://vk-miniapps-osu-schedule-back.herokuapp.com/schedule?group=" + group + "&date=" + date;
		let response = await fetch(url);
		let json = await response.json();
		lessons = await json.lesson;
		return lessons;
	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' faculty={faculty} course={course} date={date} go={go} />
			<Schedule id='schedule' lessons={lessons} go={go} />
		</View>
	);
}

export default App;

