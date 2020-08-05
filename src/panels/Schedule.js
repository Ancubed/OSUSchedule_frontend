import React from 'react';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Headline from '@vkontakte/vkui/dist/components/Typography/Headline/Headline';
import Subhead from '@vkontakte/vkui/dist/components/Typography/Subhead/Subhead';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import Icon16InfoOutline from '@vkontakte/icons/dist/16/info_outline';


const osName = platform();

class Schedule extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//const lessons = this.props.lessons;
		const lessons = [
			{
				numberOfLesson: 1,
				isSingle: true,
				lessonName: 'Комп. сети',
				lessonType: 'лекционное занятие',
				auditorium: '2-103',
				teacher: 'Горбачев Д. В.'},
			{
				numberOfLesson: 2,
				isSingle: true,
				lessonName: 'WEB-программирование',
				lessonType: 'практическое занятие',
				auditorium: '1-303',
				teacher: 'Тагирова М. В.'},
			{
				numberOfLesson: 3,
				isSingle: false,
				subGroups: [
					{
						lessonName: 'Физ-ра (ю)',
						lessonType: 'прaктическое занятие',
						auditorium: '18-201',
						teacher: 'Мышин П.П.'
					},
					{
						lessonName: 'Физ-ра (д)',
						lessonType: 'парктическое занятие',
						auditorium: '1-202',
						teacher: 'Валенок П.П.'
					},
					{
						lessonName: 'Физ-ра (с)',
						lessonType: 'парктическое занятие',
						auditorium: '1-203',
						teacher: 'Одноног П.П.'
					},
			]}
		]
		const date = this.props.dateForSchedule;
		const lessonsIsEmpty = (lessons.length === 0);

		return (
			<Panel id={this.props.id}>
				<PanelHeader
					left={<PanelHeaderButton onClick={this.props.go} data-to="home">
						{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
					</PanelHeaderButton>}>
					Расписание
				</PanelHeader>
				<Group title="Schedule">
					<Div id="date">
						<Title level="2" weight="heavy">{date}</Title>
					</Div>
					<Div id="lessions">
						{lessonsIsEmpty
						? <Title level="2" weight="semibold">{'У группы нет пар в этот день.'}</Title>
						: <PairList lessons={lessons} modalcallback={this.props.modalcallback}/>}
					</Div>
				</Group>
			</Panel>
		);
	}
}

function PairList(props) {

	return (
		<Div id="pairList">
			{props.lessons.map((lesson, index) => 
				lesson.isSingle ?
				<SingleGroupPair key={index} lesson={lesson} modalcallback={props.modalcallback}/>:
				<NotSingleGroupPair key={index} lesson={lesson} modalcallback={props.modalcallback}/>)
			}
	  	</Div>
	);
}

function SingleGroupPair(props) {

	return (
		<Div className='pair single' onClick={props.modalcallback} 
		data-issingle={props.lesson.isSingle}
		data-lessonname={props.lesson.lessonName}
		data-lessontype={props.lesson.lessonType}
		data-numberoflesson={props.lesson.numberOfLesson}
		data-auditorium={props.lesson.auditorium}
		data-teacher={props.lesson.teacher}>
			<Div className='numberOfPair'>
				<Headline weight="regular">{props.lesson.numberOfLesson}</Headline>
			</Div>
			<Div className='infoOfPair'>
				<Div className='nameOfPair'>
					<Subhead weight="bold">{props.lesson.lessonName}</Subhead>
				</Div>
				<Div className='typeOfPair'>
					<Text weight="regular">{props.lesson.lessonType}</Text>
				</Div>
			</Div>
			<Div className='auditoriumOfPair'>
				<Subhead id='textOfAuditorium' weight="medium">{props.lesson.auditorium}</Subhead>
			</Div>
			<Div className='infoIcon'>
				<Icon16InfoOutline width={17} height={17} />
			</Div>
		</Div>
	);
}

function NotSingleGroupPair(props) {

	return (
		<Div className='pair notSingle'>
			<Div className='numberOfPair'>
				<Headline weight="regular">{props.lesson.numberOfLesson}</Headline>
			</Div>
			<Div id='infoOfSubGroups'>
				{props.lesson.subGroups.map((subGroup, index) => 
					<Div key={index} className='infoOfSingleSubGroup' onClick={props.modalcallback}
					data-issingle={props.lesson.isSingle}
					data-lessonname={subGroup.lessonName}
					data-lessontype={subGroup.lessonType}
					data-numberoflesson={props.lesson.numberOfLesson}
					data-auditorium={subGroup.auditorium}
					data-teacher={subGroup.teacher}>
						<Div className='infoOfPair'>
							<Div className='nameOfPair'>
								<Subhead weight="bold">{subGroup.lessonName}</Subhead>
							</Div>
							<Div className='typeOfPair'>
								<Text weight="regular">{subGroup.lessonType}</Text>
							</Div>
						</Div>
						<Div className='auditoriumOfPair'>
							<Subhead id='textOfAuditorium' weight="medium">{subGroup.auditorium}</Subhead>
						</Div>
						<Div className='infoIcon'>
							<Icon16InfoOutline width={17} height={17} />
						</Div>
					</Div>
					)
				}
			</Div>
		</Div>
	);
}

export default Schedule;
