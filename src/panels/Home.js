import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Link from '@vkontakte/vkui/dist/components/Link/Link';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';

import logo from '../img/logo.png';
import './Schedule.css';


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.changeDate = this.changeDate.bind(this);
		this.changeGroup = this.changeGroup.bind(this);
		this.changeCourse = this.changeCourse.bind(this);
		this.changeFaculty = this.changeFaculty.bind(this);
		this.state = {
			groups: this.props.group[this.props.course[0].value+this.props.faculty[0].value],
			group: this.props.group[this.props.course[0].value+this.props.faculty[0].value][0].value,
			faculty: this.props.faculty[0].value,
			course: this.props.course[0].value,
			date: this.props.date,
		}
	}

	changeGroup(e) {
		try {
			this.setState({group: e.target.value});
		} catch (error) {
			console.log('Нет такой группы');
		}
	}

	changeCourse(e) {
		try {
			this.setState({course: e.target.value, groups: this.props.group[e.target.value+this.state.faculty], group: this.props.group[e.target.value+this.state.faculty][0].value});
		} catch (error) {
			console.log('Нет такого курса на факультете');
		}
	}

	changeFaculty(e) {
		try {
			this.setState({faculty: e.target.value, groups: this.props.group[this.state.course+e.target.value], group: this.props.group[this.state.course+e.target.value][0].value});
		} catch (error) {
			console.log('Нет такого курса на факультете');
		}
	}

	changeDate(e) {
		try {
			this.setState({date: e.target.value});
		} catch (error) {
			console.log('Дата неверна');
		}
	}

	render() {
		const state = this.state;
		return (
			<Panel id={this.props.id}>
				<PanelHeader>Расписание ОГУ</PanelHeader>
				<img className="Schedule" src={logo} alt="Оренбургский Государственный Университет"/>
				<FormLayout>
					<FormLayoutGroup top="Информация о группе">
						<Select onChange={this.changeFaculty} placeholder="Факультет"
            			value={this.state.faculty}>
							{this.props.faculty.map((fac) => 
							<option value={fac.value}>{fac.label}</option>)}
						</Select>
						<Select onChange={this.changeCourse} placeholder="Поток"
						value={this.state.course}>
							{this.props.course.map((cour) => 
							<option value={cour.value}>{cour.label}</option>)}
						</Select>
						<Select value={this.state.group} onChange={this.changeGroup} placeholder="Группа"
						value={this.state.group}>
							{this.state.groups.map((grop) => 
							<option value={grop.value}>{grop.label}</option>)}
						</Select>
					</FormLayoutGroup>
					<FormLayoutGroup top="Дата">
						<Input type="date"onChange={this.changeDate}
						value={this.state.date}/>
					</FormLayoutGroup>
					<Button size="xl" level="2" onClick={this.props.go} data-to="schedule" data-group={this.state.group} data-date={this.state.date}>
						Показать
					</Button>
				</FormLayout>
				<Group title="Footer" id="footer">
					<Div id="link">
						<Link href="https://www.instagram.com/_ancubed_/" target="_blank">Андрей Антонов</Link>
					</Div>
				</Group>
			</Panel>
		);
	}
}

export default Home;
// ЗАгрузка
// class Example extends React.Component {

// 	constructor (props) {
  
// 	  this.state = {
// 		popout: null
// 	  }
// 	}
  
// 	onClick () {
// 	  this.setState({ popout: <ScreenSpinner /> });
// 	  setTimeout(() => { this.setState({ popout: null }) }, 2000);
// 	}
  
// 	render () {
// 	  return (
// 		<View popout={this.state.popout} activePanel="spinner">
// 		  <Panel id="spinner">
// 			<PanelHeader>ScreenSpinner</PanelHeader>
// 			<FormLayout>
// 			  <CellButton onClick={this.onClick.bind(this)}>Запустить долгий процесс</CellButton>
// 			</FormLayout>
// 		  </Panel>
// 		</View>
// 	  )
// 	}
//   }
  
//   <Example />