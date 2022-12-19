
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import {
	Card,
	Title,
	Paragraph,
	List,
	MD3DarkTheme,
	MD3LightTheme,
	adaptNavigationTheme,
	Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';
import React from 'react';
import PreferencesContext from './preferencesContext';
const { LightTheme, DarkTheme } = adaptNavigationTheme({
	light: NavigationDefaultTheme,
	dark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3DarkTheme, LightTheme);
const CombinedDarkTheme = merge(MD3LightTheme, DarkTheme);
import Header from "./header";
const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => (
	<TouchableOpacity
		onPress={() =>
			navigation?.push('Details', {
				title,
				content,
			})
		}
	>
		<Card>
			<Card.Content>
				<Title>{title}</Title>
				<Paragraph>{content}</Paragraph>
			</Card.Content>
		</Card>
	</TouchableOpacity>
);

const DetailsScreen = (props) => {
	const { title, content } = props?.route?.params;
	return (
		<List.Section>
			<List.Subheader>{title}</List.Subheader>
			<List.Item title={content} />
		</List.Section>
	);
};

export default function App() {
	const [isThemeDark, setIsThemeDark] = React.useState(false);

	let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

	const toggleTheme = React.useCallback(() => {
		return setIsThemeDark(!isThemeDark);
	}, [isThemeDark]);

	const preferences = React.useMemo(
		() => ({
			toggleTheme,
			isThemeDark,
		}),
		[toggleTheme, isThemeDark]
	);
	return (
		<PreferencesContext.Provider value={preferences}>
			<PaperProvider theme={CombinedDarkTheme}>
				<NavigationContainer theme={CombinedDarkTheme}>
					<Stack.Navigator initialRouteName="Home"
						screenOptions={{
							header: (props) => <Header {...props} />
						}}
					>
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen name="Details" component={DetailsScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</PreferencesContext.Provider>
	);
}