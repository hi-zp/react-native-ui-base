import { ThemeProvider } from 'react-native-ui-base';
import { ColorDemoPage } from './ColorDemoPage';
import { TextDemoPage } from './TextDemoPage';
import { ScrollView } from 'react-native';

export default function App() {
  return (
    <ThemeProvider>
      <ScrollView>
        <TextDemoPage />
        <ColorDemoPage />
      </ScrollView>
    </ThemeProvider>
  );
}