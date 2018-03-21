import React from 'react';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom';


export default class Track extends React.Component {
	render() {
		let {routes} = this.props;
		let Default=routes[0].component;
		return (
			<Layout>
				<Switch>
					{
						routes.map((route, i) => (
							<Route path={route.path} {...route.props} key={i} render={props => (
								<route.component {...props} routes={route.routes} parentLink={route.path} tier1="追查行踪"/>
							)}/>
						))
					}
					<Route path="/track" {...routes[0].props} key='default' render={props => (
						<Default {...props} routes={routes[0].routes} parentLink={routes[0].path} tier1="追查行踪"/>
					)}/>
				</Switch>
			</Layout>
		)
	}
}