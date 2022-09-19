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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Schedule(props) {
	return (
		<Panel id={props.id}>
			<PanelHeader
				left={<PanelHeaderButton onClick={props.go} data-to="home">
					{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</PanelHeaderButton>}>
				Расписание
			</PanelHeader>
			<Group title="Schedule">
				<Div id="lessions">
					{props.days.length === 0
					? <Title level="1" weight="semibold">{'Расписание недоступно'}</Title>
					: <DaysOfWeek days={props.days} modalcallback={props.modalcallback}/>}
				</Div>
			</Group>
		</Panel>
	);
}

function DaysOfWeek(props) {
	return (
		<>
			{props.days && props.days.map(day => 
				<Div key={day.date}>
					<Div id="date">
						<Title level="2" weight="heavy">{day.date}</Title>
					</Div>
					{!day.lessons || day.lessons.length === 0
					? <p className='no-pair-title' weight="semibold">{'Нет пар в этот день'}</p>
					: <PairList lessons={day.lessons} modalcallback={props.modalcallback}/>}
				</Div>
			)}
		</>
	)
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
					<Text weight="regular">{capitalizeFirstLetter(props.lesson.lessonType)}</Text>
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
					data-lessontype={capitalizeFirstLetter(subGroup.lessonType)}
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
