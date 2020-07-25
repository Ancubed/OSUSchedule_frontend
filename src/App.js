import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import Schedule from './panels/Schedule';

const App = () => {
	const faculty = [
		{value: 'fmit', label: 'ФМИТ'},
		{value: 'aki', label: 'АКИ'},
		{value: 'im', label: 'ИМ'},];
	const course = [
		{value: '1', label: '1 курс'},
		{value: '2', label: '2 курс'},
		{value: '3', label: '3 курс'},
		{value: '4', label: '4 курс'},
		{value: '5', label: '5 курс'},];
	const group = {
		'1fmit': [{value: '33333', label: '20Пинж(ба)РПиС'},
		{value: '33331', label: '20ИВТ(ба)ОП'}],
		'2fmit': [{value: '22222', label: '19Пинж(ба)РПиС'},
				],
		'3fmit': [{value: '11852', label: '18Пинж(ба)РПиС'},
				],
		'4fmit': [{value: '00000', label: '17Пинж(ба)РПиС'},
				],
		'1aki': [{value: '33333', label: '20хз'},
				],
		'2aki': [{value: '22222', label: '19хз'},
				],
		'3aki': [{value: '11111', label: '18хз'},
				],
		'4aki': [{value: '00000', label: '17хз'},
				],};
	const groupNumbers = {'18Пинж(ба)РПиС': 11111, '19Пинж(ба)РПиС': 22222}
	const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

	const [activePanel, setActivePanel] = useState('home');
	const [lessons, setLessons] = useState(['пусто']);
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
			setLessons(scrapSchedule(e.currentTarget.dataset.group, e.currentTarget.dataset.date));
		}
		setActivePanel(e.currentTarget.dataset.to);
	};

	function scrapSchedule(group, date) {
		console.log(group);
		console.log(date);
		let lessons = {}
		const url = "https://vk-miniapps-osu-schedule-back.herokuapp.com/schedule?group=" + group + "&date=" + date;
		fetch(url)
        .then(function (response) {
			console.log(response.status); // 200
			return response.json();
		})
        .then(json => {
            console.log(json);
			console.log(typeof json);
			return json;
		})
		.then(json => {
			lessons = json.lesson;
		})
		.catch(function (error) {
			lessons = ['ошибка'];
		});
		return lessons;
		// let url = "http://www.osu.ru/pages/schedule/?who=1&what=1&filial=1&group=" + group + "&mode=full";
		// fetch(url)
        // .then(  
		// 	function(response) {   
		// 		console.log('Status Code: ' +  
		// 		  response.status);  
		// 		  console.log(response.type);
		
		// 	  // Examine the text in the response  
		// 	  response.text().then(function(data) {  
		// 		console.log(data);  
		// 	  });  
		// 	}  
		//   )  
		//   .catch(function(err) {  
		// 	console.log('Fetch Error :-S', err);  
		//   });
	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' faculty={faculty} course={course} group={group} date={date} go={go} />
			<Schedule id='schedule' lessons={lessons} go={go} />
		</View>
	);
}

export default App;

