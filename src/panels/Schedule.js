import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';


const osName = platform();

class Schedule extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const lessons = this.props.lessons;
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
					<Div id="Lessions">
						<Title level="2" weight="semibold">{date}</Title>
					</Div>
					<Div id="Lessions">
						{lessonsIsEmpty
						? <Title level="2" weight="semibold">{'В этот день у группы нет пар.'}</Title>
						: <NumberList lessons={lessons} />}
					</Div>
				</Group>
			</Panel>
		);
	}
}

function ListItem(props) {
	return <Title level="3" weight="bold" style={{ marginBottom: 16 }}>{props.value}</Title>
}

function NumberList(props) {
	return (
	  <ul>
		{props.lessons.map((lesson, index) => 
			lesson.isSingle ?
			<ListItem key={index} value={lesson.lessonName} />:
			<ListItem key={index} value={lesson.subGroups[0].lessonName} />)
		}
	  </ul>
	);
  }

export default Schedule;
