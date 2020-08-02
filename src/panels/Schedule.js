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
				lessonName: 'Прим пары',
				lessonType: 'лекционное занятие',
				auditorium: '2-103',
				teacher: 'Пример П.П.'},
			{
				numberOfLesson: 2,
				isSingle: true,
				lessonName: 'Прим пары',
				lessonType: 'парктическое занятие',
				auditorium: '1-203',
				teacher: 'Пример П.П.'},
			{
				numberOfLesson: 3,
				isSingle: false,
				subGroups: [
					{
						lessonName: 'Прим пары 1',
						lessonType: 'прaктическое занятие',
						auditorium: '1-201',
						teacher: 'Пример П.П.'
					},
					{
						lessonName: 'Прим пары 2',
						lessonType: 'парктическое занятие',
						auditorium: '1-202',
						teacher: 'Пример П.П.'
					},
					{
						lessonName: 'Прим пары 3',
						lessonType: 'парктическое занятие',
						auditorium: '1-203',
						teacher: 'Пример П.П.'
					},
			]}
		]
		console.log(lessons);
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
						: <PairList lessons={lessons} />}
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
				<SingleGroupPair key={index} lesson={lesson} />:
				<NotSingleGroupPair key={index} lesson={lesson} />)
			}
	  	</Div>
	);
}

function SingleGroupPair(props) {
	return (
		<Div className='pair single'>
			<Div className='numberOfPair'>
				<Headline weight="regular">{props.lesson.numberOfLesson}</Headline>
			</Div>
			<Div className='infoOfPair'>
				<Div className='nameOfPair'>
					<Subhead weight="regular">{props.lesson.lessonName}</Subhead>
				</Div>
				<Div className='typeOfPair'>
					<Text weight="regular">{props.lesson.lessonType}</Text>
				</Div>
			</Div>
			<Div className='auditoriumOfPair'>
				<Subhead id='textOfAuditorium' weight="medium">{props.lesson.auditorium}</Subhead>
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
					<Div className='infoOfSingleSubGroup'>
						<Div className='infoOfPair'>
							<Div className='nameOfPair'>
								<Subhead weight="regular">{subGroup.lessonName}</Subhead>
							</Div>
							<Div className='typeOfPair'>
								<Text weight="regular">{subGroup.lessonType}</Text>
							</Div>
						</Div>
						<Div className='auditoriumOfPair'>
							<Subhead id='textOfAuditorium' weight="medium">{subGroup.auditorium}</Subhead>
						</Div>
					</Div>
					)
				}
			</Div>
		</Div>
	);
}

export default Schedule;
