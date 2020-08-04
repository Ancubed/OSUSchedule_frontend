import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import Schedule from './panels/Schedule';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import ModalCard from '@vkontakte/vkui/dist/components/ModalCard/ModalCard';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Subhead from '@vkontakte/vkui/dist/components/Typography/Subhead/Subhead';
import Headline from '@vkontakte/vkui/dist/components/Typography/Headline/Headline';
import Textarea from '@vkontakte/vkui/dist/components/Textarea/Textarea';


const App = () => {
	const MODAL_CARD_FULL_INFO = 'pairFullInfo';
	const MODAL_CARD_ADD_HOMEWORK = 'addHomework'
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
	const pairTime = {
		1: ['8:00', '9:30'],
		2: ['9:40', '11:10'],
		3: ['11:20', '12:50'],
		4: ['13:20', '14:50'],
		5: ['15:00', '16:30'],
		6: ['16:40', '18:10'],
		7: ['18:20', '19:50'],
		8: ['20:00', '21:30'],
	}
	const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
	const [dateForSchedule, setDateForSchedule] = useState('');
	const [activePanel, setActivePanel] = useState('home');
	const [lessons, setLessons] = useState([{
		numberOfLesson: 0,
		isSingle: true,
		lessonName: "",
		lessonType: "",
		auditorium: "",
		teacher: ""
		}]);
	const [popout, setPopout] = useState(null);
	const [modal, setModal] = useState(null);
	const [lessonInfoForModal, setLessonInfoForModal] = useState({
		lessonName: '',
		lessonType: '',
		auditorium: '',
		teacher: '',
		pairTime: ''
	});

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
	}, []);
	
	const modalcallback = e => {
		setLessonInfoForModal({
			lessonName: e.currentTarget.dataset.lessonname,
			lessonType: e.currentTarget.dataset.lessontype,
			auditorium: e.currentTarget.dataset.auditorium,
			teacher: e.currentTarget.dataset.teacher,
			pairTime: pairTime[e.currentTarget.dataset.numberoflesson][0] + ' - ' + pairTime[e.currentTarget.dataset.numberoflesson][1],
			homework: localStorage[e.currentTarget.dataset.lessonname] || ''
		});
		setModal(MODAL_CARD_FULL_INFO);
	}

	const go = e => {
		if (e.currentTarget.dataset.to === "schedule") {
		setPopout(<ScreenSpinner />);
		scrapSchedule(e.currentTarget.dataset.group, e.currentTarget.dataset.date).then(function(json) {
			setLessons(json.lessons);
			setDateForSchedule(json.date);
			setPopout(null);
		});
		}
		else if (e.currentTarget.dataset.to === "home") {
			setLessons([{
				numberOfLesson: 0,
				isSingle: true,
				lessonName: "",
				lessonType: "",
				auditorium: "",
				teacher: ""
				}]);
				setDateForSchedule('')
		}
		setActivePanel(e.currentTarget.dataset.to);
	};

	async function scrapSchedule(group, date) {
		let lessons = []
		const url = "https://vk-miniapps-osu-schedule-back.herokuapp.com/schedule?group=" + group + "&date=" + date;
		let response = await fetch(url);
		let json = await response.json();
		lessons = await json;
		return lessons;
	};

	function homeworkChange(e) {
		try {
			localStorage[lessonInfoForModal.lessonName] = e.target.value;
		} catch(e) {
			console.log('Storage is full');
		}
	}
	
	let modalCard = (
		<ModalRoot activeModal={modal}>
			<ModalCard
			id={MODAL_CARD_FULL_INFO}
			onClose={() => setModal(null)}
			header="Подробнее"
			caption=""
			actionsLayout="vertical"
			actions={[{
				title: 'Добавить Д/З',
				mode: 'primary',
				action: () => {
					setModal(MODAL_CARD_ADD_HOMEWORK);
				}},
				{
				title: 'Закрыть',
				mode: 'secondary',
				action: () => {
					setModal(null);
				}
			}]} >
				<Div className='modalCardDiv'>
					<Headline weight="semibold">
						Название
					</Headline>
					<Subhead weight="medium" style={{ marginBottom: 2 }}>
						{lessonInfoForModal.lessonName}
					</Subhead>
				</Div>
				<Div className='modalCardDiv'>
					<Headline weight="semibold">
						Тип
					</Headline>
					<Subhead weight="medium" style={{ marginBottom: 2 }}>
						{lessonInfoForModal.lessonType}
					</Subhead>
				</Div>
				<Div className='modalCardDiv'>
					<Headline weight="semibold">
						Аудитория
					</Headline>
					<Subhead weight="medium" style={{ marginBottom: 2 }}>
						{lessonInfoForModal.auditorium}
					</Subhead>
				</Div>
				<Div className='modalCardDiv'>
					<Headline weight="semibold">
						Преподаватель
					</Headline>
					<Subhead weight="medium" style={{ marginBottom: 2 }}>
						{lessonInfoForModal.teacher}
					</Subhead>
				</Div>
				<Div className='modalCardDiv'>
					<Headline weight="semibold">
						Расписание звонков
					</Headline>
					<Subhead weight="medium" style={{ marginBottom: 2 }}>
						{lessonInfoForModal.pairTime}
					</Subhead>
				</Div>
				{!localStorage[lessonInfoForModal.lessonName] ||
					<Div className='modalCardDiv'>
						<Headline weight="semibold">
							Домашнее задание
						</Headline>
						<Subhead weight="medium" style={{ marginBottom: 2 }}>
							{lessonInfoForModal.homework}
						</Subhead>
					</Div>
				}
			</ModalCard>
			<ModalCard
			id={MODAL_CARD_ADD_HOMEWORK}
			onClose={() => setModal(null)}
			header={localStorage[lessonInfoForModal.lessonName] ? "Редактировать Д/З" : "Добавить Д/З"}
			actionsLayout="vertical"
			actions={[
				{
				title: 'Сохранить',
				mode: 'primary',
				action: () => {
					setModal(MODAL_CARD_FULL_INFO);
					setLessonInfoForModal({
						lessonName: lessonInfoForModal.lessonName,
						lessonType: lessonInfoForModal.lessonType,
						auditorium: lessonInfoForModal.auditorium,
						teacher: lessonInfoForModal.teacher,
						pairTime: lessonInfoForModal.pairTime,
						homework: localStorage[lessonInfoForModal.lessonName] || ''
					});
				}},
				{
				title: 'Отмена',
				mode: 'secondary',
				action: () => {
					setModal(MODAL_CARD_FULL_INFO);
				}}
          	]}>
			<Textarea defaultValue={localStorage[lessonInfoForModal.lessonName] || '' } onChange={homeworkChange} />
			</ModalCard>
		</ModalRoot>);

	return (
		<View activePanel={activePanel} popout={popout} modal={modalCard}>
			<Home id='home' faculty={faculty} course={course} date={date} go={go} />
			<Schedule id='schedule' lessons={lessons} dateForSchedule={dateForSchedule} go={go} modalcallback={modalcallback}/>
		</View>
	);
}

export default App;

