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
						<NumberList numbers={this.props.lessons} />
					</Div>
				</Group>
			</Panel>
		);
	}
}

function ListItem(props) {
	return <Title level="2" weight="semibold" style={{ marginBottom: 16 }}>{props.value}</Title>
}

function NumberList(props) {
	const numbers = props.numbers;
	return (
	  <ul>
		{numbers.map((number) =>
		  <ListItem key={number.toString()}
					value={number} />
		)}
	  </ul>
	);
  }

export default Schedule;
