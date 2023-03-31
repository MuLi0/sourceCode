import './assets/rem.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/reset.css'

import {
	Button, Tab, Tabs, Swipe, SwipeItem,
	Grid, GridItem, CountDown, Col, Row,
	Tabbar, TabbarItem, Sidebar, SidebarItem,
	ActionSheet, Stepper, Area, Icon, Rate,
	ActionBar, ActionBarIcon, ActionBarButton,
	Checkbox, CheckboxGroup, Switch, Form, Field,
	CellGroup, Dialog, AddressEdit, Uploader
} from 'vant';

const app = createApp(App)

app.use(Button).use(Tab).use(Tabs).use(Swipe).use(SwipeItem)
	.use(Grid).use(GridItem).use(CountDown).use(Col).use(Icon)
	.use(Row).use(Tabbar).use(TabbarItem).use(Sidebar).use(Rate)
	.use(SidebarItem).use(ActionSheet).use(Stepper).use(Area)
	.use(ActionBar).use(ActionBarIcon).use(ActionBarButton)
	.use(Checkbox).use(CheckboxGroup).use(Switch).use(Form)
	.use(Field).use(CellGroup).use(Dialog).use(AddressEdit)
	.use(Uploader);

app.use(store).use(router).mount('#app')
