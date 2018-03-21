import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon, Button} from 'antd';

let SubMenu = Menu.SubMenu;

export default class NavDark extends React.Component {
	constructor() {
		super();
		let aryParams = window.location.hash.split('/');
		this.state = {
			defaultOpenWord: aryParams[1],
			defaultSelectedWord: aryParams[2]
		}
	}
	render() {
		let {mode, navItems, theme, inlineCollapsed} = this.props;
		let {defaultOpenWord,defaultSelectedWord}=this.state;
		let defaultSelectedKey='/'+defaultOpenWord;
		if(defaultSelectedWord){
			defaultSelectedKey+='/'+defaultSelectedWord;
		}
		let openFlag=navItems.some(item=>item.router==='/'+defaultOpenWord);
		let selectedFlag=false;
		if(openFlag){
			selectedFlag=navItems.some(item=>{
				if(item.link) {
					return item.link.some(ite => ite.router === defaultSelectedKey)
				}else {
					return true
				}
			})
		}
		if(selectedFlag){
			defaultSelectedKey=[defaultSelectedKey];
		}else if(navItems[0].link){
			defaultSelectedKey=[navItems[0].link[0].router];
		}else {
			defaultSelectedKey=[navItems[0].router];
		}
		return (
			<Menu
				defaultOpenKeys={openFlag?['/'+defaultOpenWord]:[navItems[0].router]}
				defaultSelectedKeys={defaultSelectedKey}
				mode={mode}
				theme={theme}
				inlineCollapsed={inlineCollapsed}
				style={{Height: '100%'}}
			>
				{navItems.map((item, index) => {
					if(item.link){
						return (
							<SubMenu key={item.router} title={<span><Icon type={item.icon}/><span>{item.header}</span></span>}>
								{item.link.map((ite, ind) => (
									<Menu.Item key={ite.router}>
										<Link to={ite.router}>
											<Icon type={ite.icon}/>
											<span>{ite.header}</span>
										</Link>
									</Menu.Item>
								))}
							</SubMenu>
						)
					}else{
						return(
							<Menu.Item key={item.router}>
								<Link to={item.router}>
									<Icon type={item.icon}/>
									<span>{item.header}</span>
								</Link>
							</Menu.Item>
						)
					}
				})}
			</Menu>
		)
	}
}